import multer from 'multer';
import path from 'path';
import fs from "fs";
import Usuarios from '../models/Usuarios.js';

// Configuración del almacenamiento de los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `./uploads/usuarios`;

    // Si la carpeta no existe, la creamos
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });  // Creamos la carpeta si no existe
    }

    cb(null, uploadPath);  // Ruta donde se guardará el archivo
  },
  filename: async (req, file, cb) => {
    try {
      // Ahora utilizamos req.params.id para obtener la ID del usuario
      const usuario = await Usuarios.findById(req.params.id);

      // Verificamos si el usuario existe
      if (!usuario) {
        return cb(new Error('Usuario no encontrado'));
      }


      // Obtenemos la extensión del archivo original
      const fileExtension = path.extname(file.originalname);

      // Creamos el nombre del archivo con la ID del usuario y la extensión
      cb(null, `${usuario._id}${fileExtension}`);
    } catch (error) {
      cb(error);  // En caso de que haya un error, lo pasamos a la función de callback
    }
  }
});

// Middleware de multer
const upload = multer({ storage: storage });

export default upload;
