import { Schema, model } from "mongoose";

const currentDate = new Date(); // Definición correcta de currentDate

const userSchema = new Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: false },
  correo: { type: String, required: true },
  secreto: { type: String, required: true },
  animales: { type: [String], required: false, default: [] }, // Definir tipo explícito para el array
  rol: { type: String, required: true, default: "usuario" },
  descripcion: { type: String, required: false, default: "" },
  ubicacion: { type: String, required: false, default: "" },
  telefono: { type: String, required: false, default: "" },
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(), // Usar una función para valores dinámicos por documento
  },
});

export default model("Usuario", userSchema);
