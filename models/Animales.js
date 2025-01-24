import { Schema, model } from "mongoose";
const currentDate = new Date();

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
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(),
  },
  perdida: { type: Boolean, required: false, default: false },
  adoptada: { type: Boolean, required: false, default: false },
});

export default model("Animales", animalesSchema);
