import * as services from "../../services/games.services.js"

export async function getGames(req, res) {
    const filtros = req.query
    try {
        const games = await services.getGames(filtros)
        res.status(200).json(games)
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}

export async function getGameById(req, res) {
    const { id } = req.params
    try {
        const game = await services.getGameById(id)
        if (!game) return res.status(404).json({ message: "Juego no encontrado" })
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}

export async function createGame(req, res) {
    const { name, description, link, img, platforms, developer, section, gamerId } = req.body

    if (!name || !description || !link || !section || !developer) {
        return res.status(400).json({ message: "Los campos name, description, link, section y developer son obligatorios" })
    }

    const game = { name, description, link, img: img || `https://picsum.photos/400/225`, platforms: platforms || [], developer, section }
    if (gamerId) game.gamerId = gamerId

    try {
        const created = await services.createGame(game)
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({ message: "Error al crear el juego" })
    }
}

export async function updateGame(req, res) {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: "El id es requerido" })

    const fields = {}
    const allowed = ["name", "description", "link", "img", "platforms", "developer", "section", "gamerId"]
    allowed.forEach(key => { if (req.body[key] !== undefined) fields[key] = req.body[key] })

    if (Object.keys(fields).length === 0) {
        return res.status(400).json({ message: "No se enviaron campos para actualizar" })
    }

    try {
        const updated = await services.updateGame(id, fields)
        if (!updated) return res.status(404).json({ message: "Juego no encontrado" })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el juego" })
    }
}

export async function deleteGame(req, res) {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: "El id es requerido" })

    try {
        const deleted = await services.deleteGame(id)
        if (!deleted) return res.status(404).json({ message: "Juego no encontrado" })
        res.status(200).json({ message: "Juego eliminado correctamente", game: deleted })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el juego" })
    }
}
