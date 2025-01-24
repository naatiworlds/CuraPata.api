import { Schema, model } from "mongoose";
const currentDate = new Date();

const animalesSchema = new Schema({
  nombre: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  asunto: { type: String, required: true },
  mensaje: { type: String, required: true },
  fechaRegistro: {
    type: String,
    required: true,
    default: () => currentDate.toLocaleDateString(),
  },
});

export default model("Contactos", animalesSchema);
