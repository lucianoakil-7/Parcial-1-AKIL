import express from "express"
import * as controllers from "../controllers/games.api.controllers.js"

const route = express.Router()

route.get("/games", controllers.getGames)
route.get("/games/:id", controllers.getGameById)
route.post("/games", controllers.createGame)
route.patch("/games/:id", controllers.updateGame)
route.delete("/games/:id", controllers.deleteGame)

export default route
