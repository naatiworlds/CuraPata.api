import { Schema, model } from "mongoose";
const currentDate = new Date();

/**
 * @swagger
 * components:
 *   schemas:
 *     Mascota:
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

const animalesSchema = new Schema({
  nombre: { type: String, required: true },
  especie: { type: String, required: true },
  raza: { type: String, required: true },
  edad: { type: Number, required: true },
  estadoSalud: { type: String, required: true },
  duenio: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fotoAnimal: {
    type: String,
    required: false,
    default: ""
  },
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(),
  },
  perdida: { type: Boolean, required: false, default: false },
  adoptada: { type: Boolean, required: false, default: false },
});

export default model("Animales", animalesSchema);
