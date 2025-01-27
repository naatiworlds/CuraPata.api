import Contactos from "../models/Contactos.js";
import Usuarios from "../models/Usuarios.js";
import mongoose from "mongoose";

export const crearContacto = async (req, res) => {
  const { nombre, correo, telefono, asunto, mensaje } = req.body;

  // Validación de campos
  if (!nombre || !asunto || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    
    // Crear instancia del modelo
    const contacto = new Contactos({
      nombre,
      asunto,
      mensaje,
    });
    await contacto.save();
    res.json({ message: "Contacto registrado con éxito", contacto });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el contacto",
      details: error.message,
    });
  }
};

export const obtenerContactos = async (req, res) => {
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
    const [contactos, total] = await Promise.all([
      Contactos.find(filter)
        .populate("nombre", "nombreUsuario correo telefono") // Mostrar solo campos relevantes
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Contactos.countDocuments(filter),
    ]);

    res.json({ total, page: pageNumber, limit: limitNumber, contactos });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los contactos",
      details: error.message,
    });
  }
};

export const editarContacto = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para actualizar un contacto" });
  }

  try {
    const contactoActualizado = await Contactos.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!contactoActualizado) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    res.json({
      message: "Contacto actualizado con éxito",
      contacto: contactoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el contacto",
      details: error.message,
    });
  }
};

export const eliminarContacto = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para eliminar un contacto" });
  }

  try {
    const contactoEliminado = await Contactos.findByIdAndDelete(id);
    if (!contactoEliminado) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    res.json({
      message: "Contacto eliminado con éxito",
      contacto: contactoEliminado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el contacto", details: error.message });
  }
};
