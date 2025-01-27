import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento de los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Aquí se guardan los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Se agrega un sufijo único a cada archivo
  }
});

// Middleware de multer
const upload = multer({ storage: storage });

export default upload;
