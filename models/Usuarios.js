import { Schema, model } from "mongoose";

const baseUrl = "https://curapata-api.onrender.com"; // URL base de tu API
const currentDate = new Date(); // Definición correcta de currentDate

const userSchema = new Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: false },
  correo: { type: String, required: true },
  secreto: { type: String, required: true },
  animales: {
    type: [Schema.Types.ObjectId],
    ref: "Animales",
    required: false,
    default: [],
  },
  rol: { type: String, required: false, default: "usuario" },
  descripcion: { type: String, required: false, default: "" },
  ubicacion: { type: String, required: false, default: "" },
  telefono: { type: String, required: false, default: "" },
  fotoPerfil: {
    type: String,
    required: false,
    default: () => `${baseUrl}/uploads/profile.jpg`, // Generar la URL completa como valor predeterminado
  },
  publicaciones: {
    type: [Schema.Types.ObjectId],
    ref: "Publicaciones",
    required: false,
    default: [],
  },
  productos: {
    type: [Schema.Types.ObjectId],
    ref: "Productos",
    required: false,
    default: [],
  },
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(), // Usar una función para valores dinámicos por documento
  },
});

export default model("Usuario", userSchema);
