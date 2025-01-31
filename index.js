import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import animalesRoutes from "./routes/animalesRoutes.js";
import contactosRoutes from "./routes/contactosRoutes.js"
import publicacionesRoutes from "./routes/publicacionesRoutes.js"
import productorRoutes from "./routes/productosRoutes.js"
import upload from "./middlewares/upload.js";
import path from "path"


import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger.js"; // Importa bien el archivo de configuración


// Configuración de variables de entorno
dotenv.config();

const app = express();

// Configuración de Swagger
const specs = swaggerJsDoc(swaggerOptions);

// Conectar a la base de datos
connectDB()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  });

app.use(cors()); // Permitir peticiones de cualquier origen
app.use(express.json()); // Reemplaza body-parser

// Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/animales", animalesRoutes);
app.use("/contactos", contactosRoutes);
app.use("/publicaciones", publicacionesRoutes);
app.use("/productos", productorRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));
// Habilitar Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
