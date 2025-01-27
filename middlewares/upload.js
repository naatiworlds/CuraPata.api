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
      let uploadPath = "";

      // Aquí usamos el tipo de archivo como parámetro para determinar la carpeta
      switch (tipoArchivo) {
        case "perfil":
          uploadPath = path.join(__dirname, "..", "uploads", "usuarios"); // Asegúrate de que la ruta es correcta
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


      // Crear la carpeta si no existe
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath); // Ruta donde se guardará el archivo
    },
    filename: async (req, file, cb) => {
      try {
        const id = req.params.id; // Usamos el id pasado en los parámetros de la URL

        let modelo;
        let documento;

        // Dependiendo del tipo de archivo, buscamos el modelo correspondiente
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

        // Buscamos el documento correspondiente por ID
        documento = await modelo.findById(id);
        if (!documento) {
          return cb(new Error(`${tipoArchivo.charAt(0).toUpperCase() + tipoArchivo.slice(1)} no encontrado`));
        }


        // Obtenemos la extensión del archivo original
        const fileExtension = path.extname(file.originalname);

        // Creamos el nombre del archivo con la ID del documento y la extensión
        cb(null, `${documento._id}${fileExtension}`);
      } catch (error) {
        cb(error); // En caso de error, lo pasamos a la función de callback
      }
    },
  });

  return multer({ storage: storage });
};

export default upload;
