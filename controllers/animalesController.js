import Animales from "../models/Animales.js";
import Usuarios from "../models/Usuarios.js";
import mongoose from "mongoose";

export const crearAnimal = async (req, res) => {
    const {nombre, especie, raza, edad, estadoSalud, duenio, perdida, adoptada, fechaRegistro} =
        req.body;

    // Validación de campos
    if (
        !nombre ||
        !especie ||
        !raza ||
        !edad ||
        !estadoSalud ||
        !duenio 
    ) {
        return res.status(400).json({error: "Todos los campos son requeridos"});
    }

    try {
        // Crear instancia del modelo
        const animal = new Animales({
            nombre,
            especie,
            raza,
            edad,
            estadoSalud,
            duenio,
            perdida,
            adoptada
        });
        await animal.save();
        res.json({message: "Animal registrado con éxito", animal});

        // agregar animal al usuario desde el servidor :D
        const usuario = await Usuarios.find({nombreUsuario: duenio});
        if (usuario) {
            usuario[0].animales.push(animal._id);
            await usuario[0].save();
        }

    } catch (error) {
        res
            .status(500)
            .json({error: "Error al agregar el animal", details: error.message});
    }
};

export const obtenerAnimales = async (req, res) => {
    const {
        _id,
        nombre,
        especie,
        raza,
        edad,
        estadoSalud,
        duenio,
        perdida,
        adoptada,
        fechaRegistro,
        page = 1,
        limit = 99,
    } = req.query;

    // Crear el filtro dinámico
    const filter = [
        { key: "_id", value: _id ? mongoose.Types.ObjectId.isValid(_id) ? _id : null : null },
        { key: "nombre", value: nombre },
        { key: "especie", value: especie },
        { key: "raza", value: raza },
        { key: "edad", value: edad ? Number(edad) : null },
        { key: "estadoSalud", value: estadoSalud },
        { key: "duenio", value: duenio },
        { key: "perdida", value: perdida },
        { key: "adoptada", value: adoptada },

        {
            key: "fechaRegistro",
            value: fechaRegistro ? { $gte: new Date(fechaRegistro) } : null,
        },
    ].reduce((acc, { key, value }) => {
        if (value !== undefined && value !== null) {
            acc[key] =
                typeof value === "string" && key !== "_id" // Excluir regex para _id
                    ? { $regex: value, $options: "i" }
                    : value;
        }
        return acc;
    }, {});

    try {
        const pageNumber = Math.max(1, parseInt(page, 10));
        const limitNumber = Math.max(1, parseInt(limit, 10));

        // Consultar la base de datos
        const [animales, total] = await Promise.all([
            Animales.find(filter)
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),
            Animales.countDocuments(filter),
        ]);

        res.json({
            total,
            page: pageNumber,
            limit: limitNumber,
            animales: animales,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los animales",
            details: error.message,
        });
    }
};

// export const obtenerAnimalesPorDuenio = async (req, res) => {
//     const {nombre} = req.params;
//     if (!nombre) {
//         return res.status(400).json({
//             error: "El nombre de usuario es requerido para buscar un usuario",
//         });
//     }

//     try {
//         // Buscar el usuario por nombre
//         const animal = await Animales.find({duenio: nombre});
//         res.json(animal);
//     } catch (error) {
//         res
//             .status(500)
//             .json({error: "Error al buscar el usuario", details: error.message});
//     }
// };

export const editarAnimal = async (req, res) => {
    const {id} = req.params;

    // Validación de campos
    if (!id) {
        return res.status(400).json({error: 'Todos los campos son requeridos para actualizar un animal'});
    }

    try {
        // Buscar y actualizar el animal por nombre
        const animalActualizado = await Animales.findByIdAndUpdate(
            id,
            req.body, {
                new: true,
            }
        );

        res.json({message: "Animal actualizado con éxito", animalActualizado});
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el animal', details: error.message});
    }
};

export const eliminarAnimal = async (req, res) => {
    const {id} = req.params;

    // Validación de campos
    if (!id) {
        return res.status(400).json({error: 'La ID es requerida para eliminar un animal'});
    }

    try {
        // Buscar y eliminar el animal por nombre
        const animalBorrado = await Animales.findByIdAndDelete(id)
        res.json({message: "Animal borrado con éxito", animal: animalBorrado});
    } catch (error) {
        res.status(500).json({error: 'Error al borrar el animal', details: error.message});
    }
};

export const obtenerAnimal = async (req, res) => {

    const {id} = req.params;
    if (!id) {
        return res.status(400).json({error: "El ID es requerido para buscar un animal"});
    }

    try {
        const animal = await Animales.findById(id);
        res.json(animal);
    } catch (error) {
        res.status(500).json({error: "Error al buscar el animal", details: error.message});
    }
}