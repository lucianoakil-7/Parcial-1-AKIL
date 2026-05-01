import * as services from "../../services/gamers.services.js"

export async function getGamers(req, res) {
    try {
        const gamers = await services.getGamers()
        res.status(200).json(gamers)
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}

export async function createGamer(req, res) {
    const { name, photo, description } = req.body

    if (!name || !description) {
        return res.status(400).json({ message: "Los campos name y description son obligatorios" })
    }

    const gamer = {
        name,
        photo: photo || `https://picsum.photos/200/200`,
        description
    }

    try {
        const created = await services.createGamer(gamer)
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({ message: "Error al crear el gamer" })
    }
}

export async function getGamesByGamer(req, res) {
    const { id } = req.params
    try {
        const result = await services.getGamesByGamer(id)
        if (!result) return res.status(404).json({ message: "Gamer no encontrado" })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}
