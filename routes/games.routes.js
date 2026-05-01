import express from "express"
import * as controllers from "../controllers/games.controller.js"

const route = express.Router()

route.get("/", controllers.getHomePage)
route.get("/seccion/:section", controllers.getSectionPage)

export default route
