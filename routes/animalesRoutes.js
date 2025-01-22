import { Router } from "express";

import {
  editarAnimal,
  crearAnimal,
  obtenerAnimales,
  eliminarAnimal,
} from "../controllers/animalesController.js";

const router = Router();

// Crear animal
router.post("/", crearAnimal);

// Obtener animales
router.get("/", obtenerAnimales);

// Editar animales por id
router.put("/:id", editarAnimal);

// Borrar animal
router.delete("/:id", eliminarAnimal);

export default router;
