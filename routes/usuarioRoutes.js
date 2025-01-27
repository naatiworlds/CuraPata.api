import { Router } from 'express';

import {
  crearUsuario,
  obtenerUsuarios,
  editarUsuario,
  eliminarUsuario,
  inicioSesion,
  obtenerUsuarioPorNombre,
  subirFotoPerfil
} from '../controllers/usuarioController.js';
import upload from '../middlewares/upload.js';

const router = Router();

// Crear usuario
router.post('/', crearUsuario);

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Obtener un usuario por username
router.get('/u/:nombreUsuario', obtenerUsuarioPorNombre);

// Iniciar sesión
router.post('/login', inicioSesion);

router.post('/upload-profile-pic/:id', upload.single('fotoPerfil'), subirFotoPerfil);


// Editar usuario por ID
router.put('/:id', upload.single('fotoPerfil'), editarUsuario);

// Eliminar usuario (se recomienda especificar el ID)
router.delete('/:id', eliminarUsuario);

export default router;
