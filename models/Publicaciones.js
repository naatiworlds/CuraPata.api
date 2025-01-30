import { Schema, model } from "mongoose";
import path from "path";

const baseUrl = "https://curapata-api.onrender.com"; // URL base de tu API
const currentDate = new Date(); // Definición correcta de currentDate

const userSchema = new Schema({
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
  },
  titulo: { type: String, required: false, default: "" },
  subtitulo: { type: String, required: false, default: "" },
  resumen: { type: String, required: false, default: "" },
  mensaje: { type: String, required: false, default: "" },
  categoria: { type: String, required: false, default: "" },
  fotoPublicacion: {
    type: String,
    required: false,
    default: "",
  },
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(),
  },
  revisada: { type: Boolean, required: false, default: false },
});

export default model("Publicaciones", userSchema);
