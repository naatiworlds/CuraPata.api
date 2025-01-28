import { Schema, model } from "mongoose";

const currentDate = new Date(); // Definición correcta de currentDate

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
