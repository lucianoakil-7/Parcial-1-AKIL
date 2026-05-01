import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.guclb2c.mongodb.net/"
const client = new MongoClient(MONGO_URI)
await client.connect()
const db = client.db("AH20232CP1")

export function getGames(filtros = {}) {
    const filter = { eliminado: { $ne: true } }
    if (filtros.section) filter.section = filtros.section
    if (filtros.platform) filter.platform = filtros.platform
    return db.collection("games").find(filter).toArray()
}

export function getGameById(id) {
    return db.collection("games").findOne({
        _id: new ObjectId(id),
        eliminado: { $ne: true }
    })
}

export function getGamesBySection(section) {
    return db.collection("games").find({
        section,
        eliminado: { $ne: true }
    }).toArray()
}

export async function createGame(game) {
    const result = await db.collection("games").insertOne(game)
    return { ...game, _id: result.insertedId }
}

export async function updateGame(id, fields) {
    await db.collection("games").updateOne(
        { _id: new ObjectId(id) },
        { $set: fields }
    )
    return getGameById(id)
}

export async function deleteGame(id) {
    const game = await getGameById(id)
    if (!game) return null
    await db.collection("games").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )
    return game
}

