import { Router } from 'express';

import {
    crearPublicacion,
    obtenerPublicaciones,
    editarPublicacion,
    eliminarPublicacion,
} from '../controllers/publicacionesController.js';
import upload from '../middlewares/upload.js';

const router = Router();

// Crear publicacion
router.post('/', upload("publicacion").single("fotoPublicacion"), crearPublicacion);

// Obtener todos los publicacions
router.get('/', obtenerPublicaciones);

// Editar publicacion por ID
router.put('/:id', upload("publicacion").single("fotoPublicacion"), editarPublicacion);

// Eliminar publicacion (se recomienda especificar el ID)
router.delete('/:id', eliminarPublicacion);

export default router;
