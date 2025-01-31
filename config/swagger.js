import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de CuraPatas",
      version: "1.0.0",
      description:
        "**Endpoints disponibles en esta API:**\n\n- Usuarios\n- Animales\n\nUtiliza los siguientes endpoints para interactuar con el sistema.",
    },
    servers: [
      {
        url: "https://curapata-api.onrender.com/",
      },
    ],
    tags: [
      {
        name: "Usuarios",
        description: "Operaciones relacionadas con usuarios",
      },
      {
        name: "Animales",
        description: "Operaciones relacionadas con animales",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Asegúrate de que esto apunta a tus archivos de rutas
};

export default swaggerOptions;
