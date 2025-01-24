import { Router } from 'express';

import {
    crearPublicacion,
    obtenerPublicaciones,
    editarPublicacion,
    eliminarPublicacion,
} from '../controllers/publicacionesController.js';

const router = Router();

// Crear usuario
router.post('/', crearPublicacion);

// Obtener todos los usuarios
router.get('/', obtenerPublicaciones);

// Editar usuario por ID
router.put('/:id', editarPublicacion);

// Eliminar usuario (se recomienda especificar el ID)
router.delete('/:id', eliminarPublicacion);

export default router;
