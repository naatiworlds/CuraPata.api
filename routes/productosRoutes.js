import { Router } from 'express';

import {
    crearProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto,
} from '../controllers/publicacionesController.js';

const router = Router();

// Crear Producto
router.post('/', crearProducto);

// Obtener todos los productos
router.get('/', obtenerProductos);

// Editar producto por ID
router.put('/:id', editarProducto);

// Eliminar producto 
router.delete('/:id', eliminarProducto);

export default router;
