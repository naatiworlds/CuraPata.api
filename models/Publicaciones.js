import { Schema, model } from "mongoose";

const currentDate = new Date(); // Definición correcta de currentDate

const userSchema = new Schema({
  autor: { type: String, required: false, default: "" },
  titulo: { type: String, required: false, default: "" },
  subtitulo: { type: String, required: false, default: "" },
  resumen: { type: String, required: false, default: "" },
  mensaje: { type: String, required: false, default: "" },
  categoria: { type: String, required: false, default: "" },
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(), // Usar una función para valores dinámicos por documento
  },
  revisada: { type: Boolean, required: false, default: "" },
});

export default model("Publicaciones", userSchema);
