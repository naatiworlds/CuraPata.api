import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";  // Importar fileURLToPath desde 'url'
import Usuarios from "../models/Usuarios.js";
import Productos from "../models/Productos.js";
import Animales from "../models/Animales.js";
import Publicaciones from "../models/Publicaciones.js";

// Obtener el directorio actual usando import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Esto simula __dirname

// Función que acepta el tipo de archivo como parámetro
const upload = (tipoArchivo) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!file) return cb(null, false); // Si no hay archivo, continuar sin error
      let uploadPath = "";

      switch (tipoArchivo) {
        case "perfil":
          uploadPath = path.join(__dirname, "..", "uploads", "usuarios");
          break;
        case "producto":
          uploadPath = path.join(__dirname, "..", "uploads", "productos");
          break;
        case "animal":
          uploadPath = path.join(__dirname, "..", "uploads", "animales");
          break;
        case "publicacion":
          uploadPath = path.join(__dirname, "..", "uploads", "publicaciones");
          break;
        default:
          return cb(new Error("Tipo de archivo no válido"));
      }

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: async (req, file, cb) => {
      if (!file) return cb(null, false); // Continuar si no hay archivo
      try {
        const id = req.params.id;
        let modelo;

        switch (tipoArchivo) {
          case "perfil":
            modelo = Usuarios;
            break;
          case "producto":
            modelo = Productos;
            break;
          case "animal":
            modelo = Animales;
            break;
          case "publicacion":
            modelo = Publicaciones;
            break;
          default:
            return cb(new Error("Tipo de archivo no válido"));
        }

        const documento = await modelo.findById(id);
        if (!documento) {
          return cb(new Error(`${tipoArchivo} no encontrado`));
        }

        const fileExtension = path.extname(file.originalname);
        cb(null, `${documento._id}${fileExtension}`);
      } catch (error) {
        cb(error);
      }
    },
  });

  return multer({ storage: storage });
};


export default upload;
