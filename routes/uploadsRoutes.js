import express from 'express';
import upload from '../middlewares/upload.js'; // Ajusta el path según tu estructura
import { subirFotoPerfil } from '../controllers/usuarios.js';

const router = express.Router();

// Ruta para subir la foto de perfil

export default router;
