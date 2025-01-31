import Productos from "../models/Productos.js";
import Usuarios from "../models/Usuarios.js";
import path from "path";
import mongoose from "mongoose";
import { actualizarImagenConId } from "../middlewares/upload.js";

export const crearProducto = async (req, res) => {
  const { 
    vendedor, 
    nombre, 
    descripcion, 
    precio, 
    moneda, 
    stock, 
    categoria,
    tempFilename
   } =
    req.body;
  // Validación de campos requeridos
  if (!vendedor || !nombre || !precio || !moneda || !stock || !categoria) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    // Verificar si el vendedor existe (si se proporciona)
    const usuario = await Usuarios.findById(vendedor);
    if (!usuario) {
      return res.status(404).json({ error: "Vendedor no encontrado" });
    }

    // Crear una nueva instancia del producto
    const producto = new Productos({
      vendedor,
      nombre,
      descripcion,
      precio,
      moneda,
      stock,
      categoria,
    });

    await producto.save();

    // Si hay una imagen temporal, actualizar con el ID real
    if (tempFilename) {
      const nuevaUrl = await actualizarImagenConId(
        "producto",
        producto._id,
        tempFilename
      );
      if (nuevaUrl) {
        producto.fotoPublicacion = nuevaUrl;
        await producto.save();
      }
    }
    // Ahora, agregar la publicación al array de publicaciones del usuario
    usuario.productos.push(producto._id);
    await usuario.save();

    res.json({ message: "Producto creado con éxito", producto });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el producto", details: error.message });
  }
};

export const obtenerProductos = async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query;

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

    const [productos, total] = await Promise.all([
      Productos.find(filter)
        .populate("vendedor", "nombreUsuario correo") // Mostrar solo campos del vendedor
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Productos.countDocuments(filter),
    ]);

    res.json({ total, page: pageNumber, limit: limitNumber, productos });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los productos",
      details: error.message,
    });
  }
};

export const editarProducto = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para actualizar un producto" });
  }

  try {
    const producto = await Productos.findById(id);
    if (!producto) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (req.file) {
      const baseUrl = "https://curapata-api.onrender.com"; // Cambia esta URL según tu dominio
      const fotoProductoUrl = `${baseUrl}/uploads/productos/${req.file.filename}`;
      producto.fotoProducto = fotoProductoUrl;
      await producto.save();
    }
    const productoActualizado = await Productos.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado con éxito",
      producto: productoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el producto",
      details: error.message,
    });
  }
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "El ID es requerido para eliminar un producto" });
  }

  try {
    const productoBorrado = await Productos.findByIdAndDelete(id);

    if (!productoBorrado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
      message: "Producto eliminado con éxito",
      producto: productoBorrado,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el producto",
      details: error.message,
    });
  }
};
