import Publicaciones from "../models/Publicaciones.js";

export const crearPublicacion = async (req, res) => {
    const { autor, titulo, subtitulo, resumen, mensaje, categoria, revisada } = req.body;

    // Validación de campos obligatorios (puedes personalizar según lo requerido)
    if (!titulo || !mensaje) {
        return res.status(400).json({ error: "El título y el mensaje son requeridos" });
    }

    try {
        // Crear instancia del modelo
        const publicacion = new Publicaciones({
            autor,
            titulo,
            subtitulo,
            resumen,
            mensaje,
            categoria,
            revisada,
        });
        await publicacion.save();
        res.json({ message: "Publicación registrada con éxito", publicacion });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar la publicación", details: error.message });
    }
};

export const obtenerPublicaciones = async (req, res) => {
    const { autor, titulo, subtitulo, resumen, mensaje, categoria, revisada, fechaRegistro, page = 1, limit = 10 } = req.query;

    // Crear el filtro dinámico
    const filter = [
        { key: "autor", value: autor },
        { key: "titulo", value: titulo },
        { key: "subtitulo", value: subtitulo },
        { key: "resumen", value: resumen },
        { key: "mensaje", value: mensaje },
        { key: "categoria", value: categoria },
        { key: "revisada", value: revisada },
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
        const [publicaciones, total] = await Promise.all([
            Publicaciones.find(filter)
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),
            Publicaciones.countDocuments(filter),
        ]);

        res.json({
            total,
            page: pageNumber,
            limit: limitNumber,
            publicaciones,
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las publicaciones", details: error.message });
    }
};

export const editarPublicacion = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "El ID es requerido para actualizar una publicación" });
    }

    try {
        const publicacionActualizada = await Publicaciones.findByIdAndUpdate(id, req.body, { new: true });
        if (!publicacionActualizada) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }
        res.json({ message: "Publicación actualizada con éxito", publicacion: publicacionActualizada });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la publicación", details: error.message });
    }
};

export const eliminarPublicacion = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "El ID es requerido para eliminar una publicación" });
    }

    try {
        const publicacionEliminada = await Publicaciones.findByIdAndDelete(id);
        if (!publicacionEliminada) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }
        res.json({ message: "Publicación eliminada con éxito", publicacion: publicacionEliminada });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la publicación", details: error.message });
    }
};

export const obtenerPublicacion = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "El ID es requerido para buscar una publicación" });
    }

    try {
        const publicacion = await Publicaciones.findById(id);
        if (!publicacion) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }
        res.json(publicacion);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar la publicación", details: error.message });
    }
};
