import Publicaciones from "../models/Publicaciones.js";
import Usuarios from "../models/Usuarios.js";
import mongoose from "mongoose";

export const crearPublicacion = async (req, res) => {
  const { autor, titulo, subtitulo, resumen, mensaje, categoria, revisada } =
    req.body;

  // Validación de campos obligatorios (puedes personalizar según lo requerido)
  if (!autor || !titulo || !subtitulo || !resumen || !mensaje || !categoria) {
    return res
      .status(400)
      .json({ error: "El título y el mensaje son requeridos" });
  }

  try {
    const usuario = await Usuarios.findById(autor);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Crear instancia del modelo
    const publicacion = new Publicaciones({
      autor,
      titulo,
      subtitulo,
      resumen,
      mensaje,
      categoria,
      revisada,
    });
    await publicacion.save();
    res.json({ message: "Publicación registrada con éxito", publicacion });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar la publicación",
      details: error.message,
    });
  }
};

export const obtenerPublicaciones = async (req, res) => {
  const { page = 1, limit = 99, ...query } = req.query;

  try {
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));

    // Crear filtro dinámico
    const filter = Object.entries(query).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] =
          key === "_id" && mongoose.Types.ObjectId.isValid(value) // Verificar validez de ObjectId
            ? value
            : { $regex: value, $options: "i" }; // Aplicar regex para otros campos
      }
      return acc;
    }, {});

    // Consultar base de datos con paginación y conteo total
    const [publicaciones, total] = await Promise.all([
      Publicaciones.find(filter)
        .populate("autor", "nombreUsuario") // Mostrar solo campos relevantes
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Publicaciones.countDocuments(filter),
    ]);

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      contactos: publicaciones,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los contactos",
      details: error.message,
    });
  }
};

export const editarPublicacion = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para actualizar una publicación" });
  }

  try {
    const publicacionActualizada = await Publicaciones.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!publicacionActualizada) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    res.json({
      message: "Publicación actualizada con éxito",
      publicacion: publicacionActualizada,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la publicación",
      details: error.message,
    });
  }
};

export const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para eliminar una publicación" });
  }

  try {
    const publicacionEliminada = await Publicaciones.findByIdAndDelete(id);
    if (!publicacionEliminada) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    res.json({
      message: "Publicación eliminada con éxito",
      publicacion: publicacionEliminada,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la publicación",
      details: error.message,
    });
  }
};

export const obtenerPublicacion = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para buscar una publicación" });
  }

  try {
    const publicacion = await Publicaciones.findById(id);
    if (!publicacion) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    res.json(publicacion);
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar la publicación",
      details: error.message,
    });
  }
};
