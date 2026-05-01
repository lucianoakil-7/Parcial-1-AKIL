import express from "express"
import gamesRoute from "./routes/games.routes.js"
import gamesApiRoute from "./api/routes/games.api.routes.js"
import gamersApiRoute from "./api/routes/gamers.api.routes.js"

const app = express()
const PORT = 3333

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(gamesRoute)

app.use("/api", gamesApiRoute)
app.use("/api", gamersApiRoute)

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
