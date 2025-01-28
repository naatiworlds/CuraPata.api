import { Router } from "express";

import {
  editarAnimal,
  crearAnimal,
  obtenerAnimales,
  eliminarAnimal,
} from "../controllers/animalesController.js";
import upload from '../middlewares/upload.js';

const router = Router();

// Crear animal
router.post("/", crearAnimal);

// Obtener animales
router.get("/", obtenerAnimales);

// Editar animales por id
router.put("/:id", upload("animal").single("fotoAnimal"), editarAnimal);

// Borrar animal
router.delete("/:id", eliminarAnimal);

export default router;
