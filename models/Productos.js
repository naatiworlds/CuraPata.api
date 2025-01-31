import { Schema, model } from "mongoose";

const currentDate = new Date(); // Definición correcta de currentDate

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del producto
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *         descripcion:
 *           type: string
 *           description: Descripción del producto
 *         precio:
 *           type: string
 *           description: Precio del producto
 *         moneda:
 *           type: string
 *           description: Moneda en la que está el precio
 *         stock:
 *           type: string
 *           description: Cantidad de stock disponible
 *         categoria:
 *           type: string
 *           description: Categoría del producto
 *         fechaRegistro:
 *           type: string
 *           description: Fecha de registro
 *         vendedor:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             nombreUsuario:
 *               type: string
 *           description: Información del vendedor
 *         revisada:
 *           type: boolean
 *           description: Indica si el producto fue revisado
 */


const userSchema = new Schema({
  vendedor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
    default: "",
  },
  nombre: { type: String, required: false, default: "" },
  descripcion: { type: String, required: false, default: "" },
  precio: { type: String, required: false, default: "" },
  moneda: { type: String, required: false, default: "" },
  stock: { type: String, required: false, default: "" },
  categoria: { type: String, required: false, default: "" },
  fotoProducto: {
    type: String,
    required: false,
    default: ""
  },
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(), // Usar una función para valores dinámicos por documento
  },
  revisada: { type: Boolean, required: false, default: false },
});

export default model("Productos", userSchema);
