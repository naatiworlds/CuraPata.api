import Publicaciones from "../models/Publicaciones.js";
import Usuarios from "../models/Usuarios.js";
import mongoose from "mongoose";
import path from "path";

import upload, { actualizarImagenConId } from "../middlewares/upload.js";

export const crearPublicacion = async (req, res) => {
  const {
    autor,
    titulo,
    subtitulo,
    resumen,
    mensaje,
    categoria,
    tempFilename,
  } = req.body;

  if (!autor || !titulo || !subtitulo || !resumen || !mensaje || !categoria) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const usuario = await Usuarios.findById(autor);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const nuevaPublicacion = new Publicaciones({
      autor,
      titulo,
      subtitulo,
      resumen,
      mensaje,
      categoria,
    });

    await nuevaPublicacion.save();

    // Si hay una imagen temporal, actualizar con el ID real
    if (tempFilename) {
      const nuevaUrl = await actualizarImagenConId(
        "publicacion",
        nuevaPublicacion._id,
        tempFilename
      );
      if (nuevaUrl) {
        nuevaPublicacion.fotoPublicacion = nuevaUrl;
        await nuevaPublicacion.save();
      }
    }

    usuario.publicaciones.push(nuevaPublicacion._id);
    await usuario.save();

    res.json({
      message: "Publicación creada con éxito",
      publicacion: nuevaPublicacion,
    });
  } catch (error) {
    res
      .status(500)
      .json({
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
        if (key === "_id" && mongoose.Types.ObjectId.isValid(value)) {
          acc[key] = value; // Filtrar por ObjectId
        } else if (key === "revisada") {
          // Convertir el valor a booleano
          acc[key] = value === "true";
        } else {
          acc[key] = { $regex: value, $options: "i" }; // Filtro de texto
        }
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
      publicaciones: publicaciones,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los publicacion",
      details: error.message,
    });
  }
};

export const editarPublicacion = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para editar un usuario" });
  }

  try {
    const publicacion = await Publicaciones.findById(id);
    if (!publicacion) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    // Buscar y actualizar la publicacion por ID
    if (req.file) {
      const baseUrl = "https://curapata-api.onrender.com"; // Cambia esta URL según tu dominio
      const fotoPublicacionUrl = `${baseUrl}/uploads/publicaciones/${req.file.filename}`;
      publicacion.fotoPublicacion = fotoPublicacionUrl;
      await publicacion.save();
    }
    const publicacionActualizado = await Publicaciones.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json({
      message: "Publicacion actualizado con éxito",
      publicacionActualizado,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al editar la publicacion",
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
