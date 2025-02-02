import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Usuario from "./models/Usuarios.js";
import Animales from "./models/Animales.js";
import Contactos from "./models/Contactos.js";
import Productos from "./models/Productos.js";
import Publicaciones from "./models/Publicaciones.js";

dotenv.config();
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/tuBaseDeDatos";

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Conectado a MongoDB. Eliminando datos anteriores...");

    await Usuario.deleteMany({});
    await Animales.deleteMany({});
    await Contactos.deleteMany({});
    await Productos.deleteMany({});
    await Publicaciones.deleteMany({});

    console.log("🗑️ Datos anteriores eliminados.");

    // 🔐 Hashear la contraseña de los administradores
    const hashedPassword = await bcrypt.hash("pass1234", 10);

    // ✅ Crear Administradores
    const admin1 = await Usuario.create({
      nombreUsuario: "rafa",
      nombre: "Rafael García",
      correo: "rafa@example.com",
      secreto: hashedPassword,
      rol: "admin",
      telefono: "612345678",
      descripcion: "Amante de los animales y activista por los derechos de las mascotas.",
      ubicacion: "Madrid, España",
    });

    const admin2 = await Usuario.create({
      nombreUsuario: "nati",
      nombre: "Natalia Pérez",
      correo: "nati@example.com",
      secreto: hashedPassword,
      rol: "admin",
      telefono: "634567890",
      descripcion: "Veterinaria con más de 10 años de experiencia.",
      ubicacion: "Barcelona, España",
    });

    console.log("👑 Administradores creados.");

    // ✅ Crear Usuarios
    const usuario1 = await Usuario.create({
      nombreUsuario: "juan23",
      nombre: "Juan López",
      correo: "juan.lopez@example.com",
      secreto: await bcrypt.hash("clave123", 10),
      telefono: "698745632",
      descripcion: "Me encantan los perros y ayudo en refugios.",
      ubicacion: "Sevilla, España",
    });

    const usuario2 = await Usuario.create({
      nombreUsuario: "maria_87",
      nombre: "María Fernández",
      correo: "maria.fernandez@example.com",
      secreto: await bcrypt.hash("perritos4ever", 10),
      telefono: "647382910",
      descripcion: "Adoro a los gatos y tengo dos en casa.",
      ubicacion: "Valencia, España",
    });
    const usuario3 = await Usuario.create({
        nombreUsuario: "pedro_99",
        nombre: "Pedro Martínez",
        correo: "pedro.martinez@example.com",
        secreto: await bcrypt.hash("gatos123", 10),
        telefono: "612998877",
        descripcion: "Amante de los animales, especialmente los gatos.",
        ubicacion: "Granada, España",
      });
      
      const usuario4 = await Usuario.create({
        nombreUsuario: "lucia_smith",
        nombre: "Lucía Smith",
        correo: "lucia.smith@example.com",
        secreto: await bcrypt.hash("perritoLindo", 10),
        telefono: "617876543",
        descripcion: "Me encanta correr con mi perro en la playa.",
        ubicacion: "Málaga, España",
      });
      
      const usuario5 = await Usuario.create({
        nombreUsuario: "jose_1985",
        nombre: "José Fernández",
        correo: "jose.fernandez@example.com",
        secreto: await bcrypt.hash("perro1234", 10),
        telefono: "634567890",
        descripcion: "Tengo un perro llamado Max y disfruto paseando con él.",
        ubicacion: "Alicante, España",
      });
      
      const usuario6 = await Usuario.create({
        nombreUsuario: "paula_zaragoza",
        nombre: "Paula González",
        correo: "paula.gonzalez@example.com",
        secreto: await bcrypt.hash("gatoLover", 10),
        telefono: "671234567",
        descripcion: "Amante de los gatos, tengo tres en casa.",
        ubicacion: "Zaragoza, España",
      });
      
      const usuario7 = await Usuario.create({
        nombreUsuario: "diego_abc",
        nombre: "Diego Rodríguez",
        correo: "diego.rodriguez@example.com",
        secreto: await bcrypt.hash("dogLover", 10),
        telefono: "692345678",
        descripcion: "Me gustan los perros grandes y hacer senderismo con ellos.",
        ubicacion: "Bilbao, España",
      });
      
      const usuario8 = await Usuario.create({
        nombreUsuario: "marta_palma",
        nombre: "Marta Palma",
        correo: "marta.palma@example.com",
        secreto: await bcrypt.hash("gatos4ever", 10),
        telefono: "661234567",
        descripcion: "Amo los gatos y tengo un refugio de gatos en mi hogar.",
        ubicacion: "Palma de Mallorca, España",
      });
      
      const usuario9 = await Usuario.create({
        nombreUsuario: "carlos_andalucia",
        nombre: "Carlos Díaz",
        correo: "carlos.diaz@example.com",
        secreto: await bcrypt.hash("perros4life", 10),
        telefono: "651234567",
        descripcion: "Soy un apasionado de los perros y la fotografía.",
        ubicacion: "Córdoba, España",
      });
      
      const usuario10 = await Usuario.create({
        nombreUsuario: "ana_huelva",
        nombre: "Ana Ruiz",
        correo: "ana.ruiz@example.com",
        secreto: await bcrypt.hash("gatoAmor", 10),
        telefono: "671234888",
        descripcion: "Adoro a los gatos y estoy buscando adoptar un segundo.",
        ubicacion: "Huelva, España",
      });

    console.log("👤 Usuarios creados.");

    // ✅ Crear Mascotas
    const mascota1 = await Animales.create({
      nombre: "Rocky",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: 3,
      estadoSalud: "bueno",
      duenio: usuario1._id,
      perdida: false,
      adoptada: true,
    });

    const mascota2 = await Animales.create({
      nombre: "Luna",
      especie: "Gato",
      raza: "Siames",
      edad: 2,
      estadoSalud: "excelente",
      duenio: usuario2._id,
      perdida: false,
      adoptada: false,
    });
    const mascota3 = await Animales.create({
        nombre: "Max",
        especie: "Perro",
        raza: "Pastor Alemán",
        edad: 5,
        estadoSalud: "excelente",
        duenio: usuario3._id,
        perdida: false,
        adoptada: false,
      });
      
      const mascota4 = await Animales.create({
        nombre: "Mimi",
        especie: "Gato",
        raza: "Persa",
        edad: 4,
        estadoSalud: "malo",
        duenio: usuario4._id,
        perdida: false,
        adoptada: true,
      });
      
      const mascota5 = await Animales.create({
        nombre: "Thor",
        especie: "Perro",
        raza: "Rottweiler",
        edad: 2,
        estadoSalud: "bueno",
        duenio: usuario5._id,
        perdida: false,
        adoptada: false,
      });
      
      const mascota6 = await Animales.create({
        nombre: "Cielo",
        especie: "Gato",
        raza: "Bengala",
        edad: 3,
        estadoSalud: "excelente",
        duenio: usuario6._id,
        perdida: true,
        adoptada: false,
      });
      
      const mascota7 = await Animales.create({
        nombre: "Bobby",
        especie: "Perro",
        raza: "Beagle",
        edad: 6,
        estadoSalud: "regular",
        duenio: usuario7._id,
        perdida: false,
        adoptada: true,
      });
      
      const mascota8 = await Animales.create({
        nombre: "Luna",
        especie: "Gato",
        raza: "Maine Coon",
        edad: 5,
        estadoSalud: "bueno",
        duenio: usuario8._id,
        perdida: false,
        adoptada: true,
      });
      
      const mascota9 = await Animales.create({
        nombre: "Rocky",
        especie: "Perro",
        raza: "Bulldog Francés",
        edad: 4,
        estadoSalud: "excelente",
        duenio: usuario9._id,
        perdida: false,
        adoptada: false,
      });
      
      const mascota10 = await Animales.create({
        nombre: "Bella",
        especie: "Gato",
        raza: "Siamés",
        edad: 2,
        estadoSalud: "bueno",
        duenio: usuario10._id,
        perdida: true,
        adoptada: false,
      });

    console.log("🐶🐱 Mascotas creadas.");

    // ✅ Crear Publicaciones
    const publicacion1 = await Publicaciones.create({
      autor: usuario1._id,
      titulo: "Rocky busca un amigo",
      subtitulo: "Necesita compañía",
      resumen: "Rocky es muy juguetón y le encanta correr en el parque.",
      mensaje: "Si tienes otro perro que busque un compañero, ¡contáctame!",
      categoria: "adopciones",
    });

    const publicacion2 = await Publicaciones.create({
      autor: usuario2._id,
      titulo: "Luna desapareció",
      subtitulo: "Ayúdame a encontrarla",
      resumen: "Luna se perdió en el barrio y estoy muy preocupada.",
      mensaje: "Si alguien la ha visto, por favor avísenme.",
      categoria: "perdidos",
    });
    const publicacion3 = await Publicaciones.create({
        autor: usuario3._id,
        titulo: "Max busca hogar",
        subtitulo: "Un perro leal y protector",
        resumen: "Max es un perro de gran tamaño, ideal para una familia activa.",
        mensaje: "Si te gustan los perros grandes y cariñosos, ¡Max podría ser tu compañero perfecto!",
        categoria: "adopciones",
      });
      
      const publicacion4 = await Publicaciones.create({
        autor: usuario4._id,
        titulo: "Mimi desapareció",
        subtitulo: "Ayuda a encontrar a Mimi",
        resumen: "Mimi es una gata persa de pelo largo, muy amigable y cariñosa.",
        mensaje: "Si alguien ha visto a Mimi, por favor, avísenme. Estoy muy preocupada.",
        categoria: "perdidos",
      });
      
      const publicacion5 = await Publicaciones.create({
        autor: usuario5._id,
        titulo: "Thor necesita un hogar",
        subtitulo: "Un rottweiler en busca de una nueva familia",
        resumen: "Thor es un perro activo y protector, perfecto para alguien que pueda darle mucho ejercicio.",
        mensaje: "Si estás buscando un perro leal y enérgico, ¡Thor es para ti!",
        categoria: "adopciones",
      });
      
      const publicacion6 = await Publicaciones.create({
        autor: usuario6._id,
        titulo: "Cielo se perdió",
        subtitulo: "Ayuda a encontrar a Cielo, mi gato bengala",
        resumen: "Cielo es un gato bengala muy cariñoso. Se perdió ayer y necesitamos ayuda.",
        mensaje: "Si ves a Cielo o sabes algo de él, por favor contáctame.",
        categoria: "perdidos",
      });
      
      const publicacion7 = await Publicaciones.create({
        autor: usuario7._id,
        titulo: "Bobby, el beagle más adorable",
        subtitulo: "Bobby está buscando un hogar lleno de amor",
        resumen: "Bobby es un perro muy dulce y sociable. Le encanta jugar y pasear.",
        mensaje: "Si buscas un compañero para tu familia, Bobby es el perro ideal.",
        categoria: "adopciones",
      });
      
      const publicacion8 = await Publicaciones.create({
        autor: usuario8._id,
        titulo: "Luna perdida en Palma",
        subtitulo: "Gata Maine Coon desaparecida",
        resumen: "Luna es una gata preciosa, muy grande y peluda. Se perdió hace 2 días.",
        mensaje: "Si la has visto, por favor contacta conmigo. Estamos muy preocupados.",
        categoria: "perdidos",
      });
      
      const publicacion9 = await Publicaciones.create({
        autor: usuario9._id,
        titulo: "Rocky, el bulldog francés, busca compañero",
        subtitulo: "Rocky está buscando otro perro para hacerle compañía",
        resumen: "Rocky es un bulldog francés muy juguetón y sociable. Le encantaría tener un amigo para jugar.",
        mensaje: "Si tienes otro perro que quiera hacer nuevos amigos, contáctame.",
        categoria: "adopciones",
      });
      
      const publicacion10 = await Publicaciones.create({
        autor: usuario10._id,
        titulo: "Bella necesita un hogar",
        subtitulo: "Gata Siamés busca un lugar seguro",
        resumen: "Bella es una gata tranquila y muy cariñosa. Está buscando una familia que le dé amor.",
        mensaje: "Si tienes espacio en tu hogar y corazón para Bella, no dudes en contactarme.",
        categoria: "adopciones",
      });
      

    console.log("📝 Publicaciones creadas.");

    // ✅ Crear Productos
    const producto1 = await Productos.create({
      vendedor: usuario1._id,
      nombre: "Collar de cuero",
      descripcion: "Hermoso collar de cuero para perros medianos y grandes.",
      precio: "15.99",
      moneda: "EUR",
      stock: "20",
      categoria: "collares",
    });

    const producto2 = await Productos.create({
      vendedor: usuario2._id,
      nombre: "Arena para gatos",
      descripcion: "Arena premium aglomerante sin olor.",
      precio: "8.50",
      moneda: "EUR",
      stock: "30",
      categoria: "otros",
    });

    const producto3 = await Productos.create({
        vendedor: usuario3._id,
        nombre: "Juguete para perro",
        descripcion: "Juguete interactivo para perros medianos y grandes. Perfecto para mantener a tu perro entretenido.",
        precio: "12.99",
        moneda: "EUR",
        stock: "50",
        categoria: "accesorios",
      });
      
      const producto4 = await Productos.create({
        vendedor: usuario4._id,
        nombre: "Comida premium para gatos",
        descripcion: "Alimento natural para gatos de todas las edades. Rico en proteínas y sin conservantes.",
        precio: "22.50",
        moneda: "EUR",
        stock: "40",
        categoria: "pienso",
      });
      
      const producto5 = await Productos.create({
        vendedor: usuario5._id,
        nombre: "Correa de cuero",
        descripcion: "Correa resistente de cuero para perros de tamaño grande. Muy duradera y cómoda.",
        precio: "18.99",
        moneda: "EUR",
        stock: "25",
        categoria: "correas",
      });
      
      const producto6 = await Productos.create({
        vendedor: usuario6._id,
        nombre: "Rascador para gatos",
        descripcion: "Rascador de cartón resistente para gatos. Ideal para evitar que rasquen los muebles.",
        precio: "15.00",
        moneda: "EUR",
        stock: "30",
        categoria: "otros",
      });
      
      const producto7 = await Productos.create({
        vendedor: usuario7._id,
        nombre: "Bañera para perros",
        descripcion: "Bañera plegable para perros, perfecta para bañarlos cómodamente en casa.",
        precio: "35.00",
        moneda: "EUR",
        stock: "15",
        categoria: "accesorios",
      });
      
      const producto8 = await Productos.create({
        vendedor: usuario8._id,
        nombre: "Alimento húmedo para gatos",
        descripcion: "Alimento húmedo de alta calidad para gatos, con sabor a pollo y atún.",
        precio: "3.99",
        moneda: "EUR",
        stock: "100",
        categoria: "pienso",
      });
      
      const producto9 = await Productos.create({
        vendedor: usuario9._id,
        nombre: "Cama ortopédica para perros",
        descripcion: "Cama ortopédica de alta calidad para perros mayores o con problemas articulares.",
        precio: "40.00",
        moneda: "EUR",
        stock: "20",
        categoria: "camas",
      });
      
      const producto10 = await Productos.create({
        vendedor: usuario10._id,
        nombre: "Juguete para gatos",
        descripcion: "Juguete interactivo para gatos, con plumas y bolas. Ideal para estimular su instinto de caza.",
        precio: "7.99",
        moneda: "EUR",
        stock: "60",
        categoria: "accesorios",
      });

    console.log("🛍️ Productos creados.");

    // ✅ Crear Mensajes de Contacto
    const contacto1 = await Contactos.create({
      nombre: "Pedro Ramírez",
      correo: "pedro.ramirez@example.com",
      telefono: "633221100",
      asunto: "Adoptar a Rocky",
      mensaje: "Hola, me interesa adoptar a Rocky, ¿podemos hablar?",
    });

    const contacto2 = await Contactos.create({
      nombre: "Ana Torres",
      correo: "ana.torres@example.com",
      telefono: "655998877",
      asunto: "información",
      mensaje: "¿Esta arena es adecuada para gatos pequeños?",
    });

    const contacto3 = await Contactos.create({
        nombre: "Carlos Jiménez",
        correo: "carlos.jimenez@example.com",
        telefono: "654123987",
        asunto: "informacion",
        mensaje: "Hola, me gustaría saber más sobre Max, el pastor alemán. ¿Está disponible para adopción?",
      });
      
      const contacto4 = await Contactos.create({
        nombre: "Eva Martínez",
        correo: "eva.martinez@example.com",
        telefono: "677543210",
        asunto: "informacion",
        mensaje: "Estoy buscando comida para mi gato. ¿Puedo saber más sobre la marca y los ingredientes?",
      });
      
      const contacto5 = await Contactos.create({
        nombre: "Santiago Torres",
        correo: "santiago.torres@example.com",
        telefono: "611234567",
        asunto: "informacion",
        mensaje: "Hola, estoy interesado en la correa de cuero que vendes. ¿Tienes disponibilidad en talla grande?",
      });
      
      const contacto6 = await Contactos.create({
        nombre: "Patricia Ruiz",
        correo: "patricia.ruiz@example.com",
        telefono: "682345678",
        asunto: "informacion",
        mensaje: "Estoy buscando un buen rascador para mi gato, ¿me puedes dar más detalles sobre el que ofreces?",
      });
      
      const contacto7 = await Contactos.create({
        nombre: "Miguel Pérez",
        correo: "miguel.perez@example.com",
        telefono: "617876543",
        asunto: "informacion",
        mensaje: "Tengo un perro grande y me gustaría saber más sobre la bañera plegable que ofreces.",
      });
      
      const contacto8 = await Contactos.create({
        nombre: "Laura Gómez",
        correo: "laura.gomez@example.com",
        telefono: "665432109",
        asunto: "informacion",
        mensaje: "Me gustaría saber más sobre el alimento húmedo para gatos. ¿Es adecuado para gatos con sensibilidad estomacal?",
      });
      
      const contacto9 = await Contactos.create({
        nombre: "Antonio Fernández",
        correo: "antonio.fernandez@example.com",
        telefono: "654987321",
        asunto: "informacion",
        mensaje: "Tengo un perro mayor y me gustaría saber más sobre la cama ortopédica que ofreces.",
      });
      
      const contacto10 = await Contactos.create({
        nombre: "Sara López",
        correo: "sara.lopez@example.com",
        telefono: "684209875",
        asunto: "informacion",
        mensaje: "Me gustaría comprar el juguete interactivo para mi gato. ¿Es adecuado para gatos de todas las edades?",
      });
      

    console.log("📩 Mensajes de contacto creados.");

    // ✅ Relacionar Usuarios con sus Publicaciones, Mascotas y Productos
    await Usuario.findByIdAndUpdate(usuario1._id, {
      $push: {
        animales: mascota1._id,
        publicaciones: publicacion1._id,
        productos: producto1._id,
      },
    });

    await Usuario.findByIdAndUpdate(usuario2._id, {
      $push: {
        animales: mascota2._id,
        publicaciones: publicacion2._id,
        productos: producto2._id,
      },
    });
    await Usuario.findByIdAndUpdate(usuario3._id, {
      $push: {
        animales: mascota3._id,
        publicaciones: publicacion3._id,
        productos: producto3._id,
      },
    });

    await Usuario.findByIdAndUpdate(usuario4._id, {
      $push: {
        animales: mascota4._id,
        publicaciones: publicacion4._id,
        productos: producto4._id,
      },
    });
    await Usuario.findByIdAndUpdate(usuario5._id, {
      $push: {
        animales: mascota5._id,
        publicaciones: publicacion5._id,
        productos: producto5._id,
      },
    });

    await Usuario.findByIdAndUpdate(usuario6._id, {
      $push: {
        animales: mascota6._id,
        publicaciones: publicacion6._id,
        productos: producto6._id,
      },
    });
    await Usuario.findByIdAndUpdate(usuario7._id, {
      $push: {
        animales: mascota7._id,
        publicaciones: publicacion7._id,
        productos: producto7._id,
      },
    });

    await Usuario.findByIdAndUpdate(usuario8._id, {
      $push: {
        animales: mascota8._id,
        publicaciones: publicacion8._id,
        productos: producto8._id,
      },
    });
    await Usuario.findByIdAndUpdate(usuario9._id, {
      $push: {
        animales: mascota9._id,
        publicaciones: publicacion9._id,
        productos: producto9._id,
      },
    });

    await Usuario.findByIdAndUpdate(usuario10._id, {
      $push: {
        animales: mascota10._id,
        publicaciones: publicacion10._id,
        productos: producto10._id,
      },
    });

    console.log("🔄 Relaciones actualizadas.");

    console.log("🎉 Seeding completado con éxito!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error en el seeding:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
