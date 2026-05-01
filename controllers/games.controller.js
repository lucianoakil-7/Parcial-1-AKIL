import * as services from "../services/games.services.js"
import { createPage, createGameGrid } from "../views/games.views.js"

const SECTION_LABELS = {
    action: "Action 🔫",
    rpg: "RPG ⚔️",
    strategy: "Strategy ♟️",
    sports: "Sports ⚽",
    horror: "Horror 👻"
}

export async function getHomePage(req, res) {
    try {
        const games = await services.getGames()
        const body = createGameGrid(games, "🎮 Todos los juegos")
        res.send(createPage("Inicio", body))
    } catch (error) {
        res.status(500).send(createPage("Error", "<p>Error al cargar los juegos.</p>"))
    }
}

export async function getSectionPage(req, res) {
    const { section } = req.params
    const label = SECTION_LABELS[section]
    if (!label) {
        return res.status(404).send(createPage("404", "<h2>Sección no encontrada</h2>"))
    }
    try {
        const games = await services.getGamesBySection(section)
        const body = createGameGrid(games, label)
        res.send(createPage(label, body))
    } catch (error) {
        res.status(500).send(createPage("Error", "<p>Error al cargar la sección.</p>"))
    }
}
