import mongoose from "mongoose";
import Usuarios from "../models/Usuarios.js";
import bcrypt from "bcryptjs"; // Corregir el nombre del paquete bcrypt

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

    // Cifrar la contraseña antes de guardarla
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
    });
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
    fechaRegistro,
    page = 1,
    limit = 99
  } = req.query;

  const filter = [
    { key: 'nombreUsuario', value: nombreUsuario },
    { key: 'nombre', value: nombre },
    { key: 'correo', value: correo },
    { key: 'secreto', value: secreto },
    { key: 'animales', value: animales },
    { key: 'rol', value: rol },
    { key: 'descripcion', value: descripcion },
    { key: 'ubicacion', value: ubicacion },
    { key: 'telefono', value: telefono },
    { key: 'fechaRegistro', value: fechaRegistro }
  ].reduce((acc, { key, value }) => {
    if (value !== undefined && value !== null) {
      acc[key] = typeof value === 'string' ? { $regex: value, $options: 'i' } : value;
    }
    return acc;
  }, {});

  try {
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));
    const [usuarios, total] = await Promise.all([
      Usuarios.find(filter).skip((pageNumber - 1) * limitNumber).limit(limitNumber),
      Usuarios.countDocuments(filter)
    ]);

    res.json({ total, page: pageNumber, limit: limitNumber, usuarios: usuarios });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
  }
};


export const obtenerUsuarioPorNombre = async (req, res) => {
  const { nombreUsuario } = req.params;

  if (!nombreUsuario) {
    return res.status(400).json({
      error: "El nombre de usuario es requerido para buscar un usuario",
    });
  }

  try {
    // Buscar el usuario por nombre
    const usuario = await Usuarios.find({ nombreUsuario });
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
    // Buscar y actualizar el usuario por ID
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
