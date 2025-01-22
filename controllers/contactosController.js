import Contactos from "../models/Contactos.js";

export const crearContacto = async (req, res) => {
    const { nombre, correo, telefono, asunto, mensaje } = req.body;

    // Validación de campos
    if (!nombre || !correo || !telefono || !asunto || !mensaje) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // Crear instancia del modelo
        const contacto = new Contactos({
            nombre,
            correo,
            telefono,
            asunto,
            mensaje,
        });
        await contacto.save();
        res.json({ message: "Contacto registrado con éxito", contacto });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el contacto", details: error.message });
    }
};

export const obtenerContactos = async (req, res) => {
    const { nombre, correo, telefono, asunto, mensaje, fechaRegistro, page = 1, limit = 10 } = req.query;

    // Crear el filtro dinámico
    const filter = [
        { key: "nombre", value: nombre },
        { key: "correo", value: correo },
        { key: "telefono", value: telefono },
        { key: "asunto", value: asunto },
        { key: "mensaje", value: mensaje },
        { key: "fechaRegistro", value: fechaRegistro ? { $gte: new Date(fechaRegistro) } : null },
    ].reduce((acc, { key, value }) => {
        if (value !== undefined && value !== null) {
            acc[key] = typeof value === "string" ? { $regex: value, $options: "i" } : value;
        }
        return acc;
    }, {});

    try {
        const pageNumber = Math.max(1, parseInt(page, 10));
        const limitNumber = Math.max(1, parseInt(limit, 10));

        // Consultar la base de datos
        const [contactos, total] = await Promise.all([
            Contactos.find(filter)
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),
            Contactos.countDocuments(filter),
        ]);

        res.json({
            total,
            page: pageNumber,
            limit: limitNumber,
            contactos,
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los contactos", details: error.message });
    }
};

export const editarContacto = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "El ID es requerido para actualizar un contacto" });
    }

    try {
        const contactoActualizado = await Contactos.findByIdAndUpdate(id, req.body, { new: true });
        if (!contactoActualizado) {
            return res.status(404).json({ error: "Contacto no encontrado" });
        }
        res.json({ message: "Contacto actualizado con éxito", contacto: contactoActualizado });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el contacto", details: error.message });
    }
};

export const eliminarContacto = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "El ID es requerido para eliminar un contacto" });
    }

    try {
        const contactoEliminado = await Contactos.findByIdAndDelete(id);
        if (!contactoEliminado) {
            return res.status(404).json({ error: "Contacto no encontrado" });
        }
        res.json({ message: "Contacto eliminado con éxito", contacto: contactoEliminado });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el contacto", details: error.message });
    }
};