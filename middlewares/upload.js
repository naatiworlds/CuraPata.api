import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Usuarios from "../models/Usuarios.js";
import Productos from "../models/Productos.js";
import Animales from "../models/Animales.js";
import Publicaciones from "../models/Publicaciones.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://curapata-api.onrender.com"; // URL base para las imágenes

const upload = (tipoArchivo) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!file) return cb(null, false);
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
      if (!file) return cb(null, false);
      try {
        let id = req.params.id || req.body.tempId; 

        if (!id) {
          const timestamp = Date.now();
          const tempFilename = `temp_${timestamp}${path.extname(file.originalname)}`;
          req.body.tempFilename = tempFilename;
          return cb(null, tempFilename);
        }

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

// Función para renombrar la imagen y actualizar la URL en el modelo
export const actualizarImagenConId = async (tipoArchivo, documentoId, tempFilename) => {
  const basePath = path.join(__dirname, "..", "uploads");

  let folder = "";
  switch (tipoArchivo) {
    case "perfil":
      folder = "usuarios";
      break;
    case "producto":
      folder = "productos";
      break;
    case "animal":
      folder = "animales";
      break;
    case "publicacion":
      folder = "publicaciones";
      break;
    default:
      throw new Error("Tipo de archivo no válido");
  }

  const tempPath = path.join(basePath, folder, tempFilename);
  const newFilename = `${documentoId}${path.extname(tempFilename)}`;
  const newPath = path.join(basePath, folder, newFilename);

  if (fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, newPath); // Renombrar archivo
    return `${BASE_URL}/uploads/${folder}/${newFilename}`; // Retornar URL completa
  }

  return null;
};

export default upload;
