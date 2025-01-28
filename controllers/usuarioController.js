import mongoose from "mongoose";
import Usuarios from "../models/Usuarios.js";
import bcrypt from "bcryptjs"; // Corregir el nombre del paquete bcrypt
import path from "path";

export const crearUsuario = async (req, res) => {
  const {
    nombreUsuario,
    nombre,
    correo,
    secreto,
    animales,
    rol,
    descripcion,
    ubicacion,
    telefono,
    publicaciones,
    productos,
  } = req.body;
  // Validación de campos
  if (!nombreUsuario || !correo || !secreto) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    // Verificar si el email ya está registrado
    const existeEmail = await Usuarios.findOne({ correo: correo });
    if (existeEmail) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Verificar si el usuario ya está registrado
    const existeUsuario = await Usuarios.findOne({ nombreUsuario });
    if (existeUsuario) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // Crear el nuevo usuario
    const hashedPassword = await bcrypt.hash(secreto, 10);
    const user = new Usuarios({
      nombreUsuario,
      nombre,
      correo,
      secreto: hashedPassword,
      animales,
      rol,
      descripcion,
      ubicacion,
      telefono,
      publicaciones,
      productos,
    });
    // Guardar el usuario
    await user.save();
    res.json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al agregar el usuario", details: error.message });
  }
};

export const inicioSesion = async (req, res) => {
  const { correo, secreto } = req.body;

  if (!correo || !secreto) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const usuario = await Usuarios.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const esValida = await bcrypt.compare(secreto, usuario.secreto);
    if (!esValida) {
      return res.status(400).json({ error: "La contraseña es incorrecta" });
    }

    res.json({ message: "Usuario logueado con éxito", usuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al loguear el usuario", details: error.message });
  }
};

export const obtenerUsuarios = async (req, res) => {
  const { page = 1, limit = 99, ...query } = req.query;

  try {
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));

    // Crear filtro dinámico
    const filter = Object.entries(query).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] =
          typeof value === "string" ? { $regex: value, $options: "i" } : value;
      }
      return acc;
    }, {});

    // Buscar usuarios y popular el campo animales
    const [usuarios, total] = await Promise.all([
      Usuarios.find(filter)
        .populate("animales", "nombre especie raza estadoSalud") // Mostrar solo campos necesarios
        .populate("publicaciones", "titulo resumen fechaRegistro")
        .populate("productos", "nombre descripcion precio")
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Usuarios.countDocuments(filter),
    ]);

    res.json({ total, page: pageNumber, limit: limitNumber, usuarios });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios", details: error.message });
  }
};

export const obtenerUsuarioPorNombre = async (req, res) => {
  const { nombreUsuario } = req.params;

  if (!nombreUsuario) {
    return res.status(400).json({ error: "El nombre de usuario es requerido" });
  }

  try {
    const usuario = await Usuarios.findOne({ nombreUsuario }).populate(
      "animales",
      "nombre especie estadoSalud"
    );

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al buscar el usuario", details: error.message });
  }
};

export const editarUsuario = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para editar un usuario" });
  }

  try {
    const usuario = await Usuarios.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (req.file) {
      const baseUrl = "https://curapata-api.onrender.com"; // Cambia esta URL según tu dominio
      const fotoPerfilUrl = `${baseUrl}/uploads/usuarios/${req.file.filename}`;
      usuario.fotoPerfil = fotoPerfilUrl;
      await usuario.save();
    }

    const usuarioActualizado = await Usuarios.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ message: "Usuario actualizado con éxito", usuarioActualizado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al editar el usuario", details: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params; // Corregir la asignación

  if (!id) {
    return res.status(400).json({
      error: "El nombre de usuario es requerido para eliminar un usuario",
    });
  }

  try {
    const usuarioBorrado = await Usuarios.findByIdAndDelete(id);
    res.json({ message: "Usuario borrado con éxito", usuarioBorrado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al borrar el usuario", details: error.message });
  }
};
