import { Router } from 'express';

import {
    crearProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto,
} from '../controllers/productosController.js';
import upload from '../middlewares/upload.js';

const router = Router();

// Crear Producto
router.post('/', upload("producto").single("fotoProducto"), crearProducto);

// Obtener todos los productos
router.get('/', obtenerProductos);

// Editar producto por ID
router.put('/:id', upload("producto").single("fotoProducto"), editarProducto);

// Eliminar producto 
router.delete('/:id', eliminarProducto);

export default router;
