import { Router } from 'express';

import {
    crearContacto,
    obtenerContactos,
    editarContacto,
    eliminarContacto,
} from '../controllers/contactosController.js';

const router = Router();

// Crear usuario
router.post('/', crearContacto);

// Obtener todos los usuarios
router.get('/', obtenerContactos);

// Editar usuario por ID
router.put('/:id', editarContacto);

// Eliminar usuario (se recomienda especificar el ID)
router.delete('/', eliminarContacto);

export default router;
