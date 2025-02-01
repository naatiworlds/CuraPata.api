import { Router } from "express";

import {
  editarAnimal,
  crearAnimal,
  obtenerAnimales,
  eliminarAnimal,
} from "../controllers/animalesController.js";
import upload from '../middlewares/upload.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Animales:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nombre:
 *           type: string
 *         especie:
 *           type: string
 *         raza:
 *           type: string
 *         edad:
 *           type: number
 *         estadoSalud:
 *           type: string
 *         duenio:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             nombreUsuario:
 *               type: string
 *             correo:
 *               type: string
 *         perdida:
 *           type: boolean
 *         adoptada:
 *           type: boolean
 *         fechaRegistro:
 *           type: string
 */

/**
 * @swagger
 * /animales:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags:
 *       - Animales  # 🔥 Se agrupa en "Animales"
 *     description: Retorna una lista de todas las mascotas disponibles.
 *     parameters:
 *       - in: query
 *         name: nombreDuenio
 *         schema:
 *           type: string
 *         description: Filtrar mascotas por el nombre del dueño
 *     responses:
 *       200:
 *         description: Lista de mascotas obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mascotas:
 *                   type: array
 *                   items:
 *                     $ref: "models/Animales.js"
 *       400:
 *         description: Error en la solicitud.
 */

// Crear animal
router.post("/", upload("animal").single("fotoAnimal"), crearAnimal);

/**
 * @swagger
 * /animales:
 *   post:
 *     summary: Crea un nuevo animal
 *     tags:
 *       - Animales  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Usuario"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 */

// Obtener animales
router.get("/", obtenerAnimales);

// Editar animales por id
router.put("/:id", upload("animal").single("fotoAnimal"), editarAnimal);

// Borrar animal
router.delete("/:id", eliminarAnimal);

export default router;
