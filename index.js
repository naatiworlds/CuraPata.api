import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import animalesRoutes from "./routes/animalesRoutes.js";

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  });

// Middlewares
app.use(cors()); // Permitir peticiones de cualquier origen
app.use(express.json()); // Reemplaza body-parser

// Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/animales", animalesRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
