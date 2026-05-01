import express from "express"
import * as controllers from "../controllers/gamers.api.controllers.js"

const route = express.Router()

route.get("/gamers", controllers.getGamers)
route.post("/gamers", controllers.createGamer)
route.get("/gamers/:id/games", controllers.getGamesByGamer)

export default route
