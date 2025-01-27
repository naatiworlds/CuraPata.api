import { Router } from 'express';

import {
    crearPublicacion,
    obtenerPublicaciones,
    editarPublicacion,
    eliminarPublicacion,
} from '../controllers/publicacionesController.js';

const router = Router();

// Crear publicacion
router.post('/', crearPublicacion);

// Obtener todos los publicacions
router.get('/', obtenerPublicaciones);

// Editar publicacion por ID
router.put('/:id', editarPublicacion);

// Eliminar publicacion (se recomienda especificar el ID)
router.delete('/:id', eliminarPublicacion);

export default router;
