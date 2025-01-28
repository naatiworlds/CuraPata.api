import Animales from "../models/Animales.js";
import Usuarios from "../models/Usuarios.js";

export const crearAnimal = async (req, res) => {
  const {
    nombre,
    especie,
    raza,
    edad,
    estadoSalud,
    duenio,
    perdida,
    adoptada,
  } = req.body;

  // Validación de campos
  if (!nombre || !especie || !raza || !edad || !estadoSalud || !duenio) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    // Verificar que el usuario exista
    const usuario = await Usuarios.findById(duenio);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Crear instancia del modelo Animales
    const animal = new Animales({
      nombre,
      especie,
      raza,
      edad,
      estadoSalud,
      duenio, // Referencia al ID del usuario
      perdida,
      adoptada,
    });

    await animal.save();

    // Asociar el animal al usuario
    usuario.animales.push(animal._id);
    await usuario.save();

    res.json({ message: "Animal registrado con éxito", animal });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al agregar el animal", details: error.message });
  }
};

export const obtenerAnimales = async (req, res) => {
  const { page = 1, limit = 99, ...query } = req.query;

  try {
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));

    // Crear filtro dinámico
    const filter = Object.entries(query).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = key !== "_id" ? { $regex: value, $options: "i" } : value;
      }
      return acc;
    }, {});

    // Buscar animales y popular el campo duenio
    const [animales, total] = await Promise.all([
      Animales.find(filter)
        .populate("duenio", "nombreUsuario correo") // Mostrar solo campos necesarios
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Animales.countDocuments(filter),
    ]);

    res.json({ total, page: pageNumber, limit: limitNumber, animales });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los animales", details: error.message });
  }
};

export const editarAnimal = async (req, res) => {
  const { id } = req.params;

  // Validación de campos
  if (!id) {
    return res.status(400).json({
      error: "Todos los campos son requeridos para actualizar un animal",
    });
  }

  try {
    const animal = await Animales.findById(id);
        if (!animal) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        if (req.file) {
          const baseUrl = "https://curapata-api.onrender.com"; // Cambia esta URL según tu dominio
          const fotoAnimalUrl = `${baseUrl}/uploads/animales/${req.file.filename}`;
          animal.fotoAnimal = fotoAnimalUrl;
          await animal.save();
        }
    // Buscar y actualizar el animal por nombre
    const animalActualizado = await Animales.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ message: "Animal actualizado con éxito", animalActualizado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el animal", details: error.message });
  }
};

export const eliminarAnimal = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "La ID es requerida para eliminar un animal" });
  }

  try {
    const animalBorrado = await Animales.findByIdAndDelete(id);

    if (!animalBorrado) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }

    // Eliminar referencia del usuario
    await Usuarios.findByIdAndUpdate(animalBorrado.duenio, {
      $pull: { animales: id },
    });

    res.json({ message: "Animal borrado con éxito", animal: animalBorrado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al borrar el animal", details: error.message });
  }
};

