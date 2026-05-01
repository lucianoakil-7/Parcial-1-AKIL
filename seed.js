

import { MongoClient } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.guclb2c.mongodb.net/"
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

const games = [
    {
        name: "Dark Souls III",
        description: "Un RPG de acción brutal y desafiante ambientado en un mundo en llamas. Explorá mazmorras oscuras y enfrentá jefes épicos.",
        link: "https://store.steampowered.com/app/374320/DARK_SOULS_III/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg",
        platforms: ["PC", "PS4", "Xbox One"],
        developer: "FromSoftware",
        section: "rpg"
    },
    {
        name: "Doom Eternal",
        description: "La secuela del aclamado DOOM 2016. Combate frenético contra hordas demoníacas en una experiencia de acción sin igual.",
        link: "https://store.steampowered.com/app/782330/DOOM_Eternal/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg",
        platforms: ["PC", "PS4", "PS5", "Xbox"],
        developer: "id Software",
        section: "action"
    },
    {
        name: "Civilization VI",
        description: "Construí una civilización que resista el paso del tiempo. Estrategia por turnos con cientos de horas de rejugabilidad.",
        link: "https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg",
        platforms: ["PC", "iOS", "Android", "Switch"],
        developer: "Firaxis Games",
        section: "strategy"
    },
    {
        name: "EA Sports FC 24",
        description: "La experiencia de fútbol más realista del año. Modo carrera, Ultimate Team y partidos en línea con millones de jugadores.",
        link: "https://store.steampowered.com/app/2195250/EA_SPORTS_FC_24/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
        platforms: ["PC", "PS5", "Xbox Series X", "Switch"],
        developer: "EA Sports",
        section: "sports"
    },
    {
        name: "Resident Evil Village",
        description: "Ethan Winters enfrenta una aldea llena de monstruos y secretos. Terror en primera persona con una narrativa apasionante.",
        link: "https://store.steampowered.com/app/1196590/Resident_Evil_Village/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header.jpg",
        platforms: ["PC", "PS4", "PS5", "Xbox"],
        developer: "Capcom",
        section: "horror"
    },
    {
        name: "The Witcher 3: Wild Hunt",
        description: "RPG de mundo abierto con una narrativa magistral. Geralt de Rivia busca a su hija adoptiva en un mundo devastado por la guerra.",
        link: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        platforms: ["PC", "PS4", "PS5", "Xbox", "Switch"],
        developer: "CD Projekt Red",
        section: "rpg"
    },
    {
        name: "Counter-Strike 2",
        description: "El shooter táctico competitivo más popular del mundo. Nuevos mapas, gráficos mejorados y la misma jugabilidad legendaria.",
        link: "https://store.steampowered.com/app/730/CounterStrike_2/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
        platforms: ["PC"],
        developer: "Valve",
        section: "action"
    },
    {
        name: "Age of Empires IV",
        description: "La saga de estrategia en tiempo real regresa con civilizaciones medievales y campañas históricas épicas.",
        link: "https://store.steampowered.com/app/1466860/Age_of_Empires_IV/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg",
        platforms: ["PC", "Xbox"],
        developer: "Relic Entertainment",
        section: "strategy"
    },
    {
        name: "Alien: Isolation",
        description: "Sobrevivir es el único objetivo. Un xenomorfo inmortal te persigue por una estación espacial en ruinas. Terror puro y tenso.",
        link: "https://store.steampowered.com/app/214490/Alien_Isolation/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/214490/header.jpg",
        platforms: ["PC", "PS4", "Xbox One", "Switch"],
        developer: "Creative Assembly",
        section: "horror"
    },
    {
        name: "NBA 2K24",
        description: "Baloncesto de élite con el modo MiCarrera más inmersivo hasta la fecha. Jugá con las estrellas de la NBA y la WNBA.",
        link: "https://store.steampowered.com/app/2328180/NBA_2K24/",
        img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2328180/header.jpg",
        platforms: ["PC", "PS5", "Xbox Series X", "Switch"],
        developer: "Visual Concepts",
        section: "sports"
    }
]

const gamers = [
    {
        name: "Valentina Cruz",
        photo: "https://picsum.photos/seed/val/200/200",
        description: "Speedrunner profesional apasionada por los souls-likes y los RPGs de mundo abierto. Streamer en Twitch."
    },
    {
        name: "Matías Romero",
        photo: "https://picsum.photos/seed/mat/200/200",
        description: "Fan número uno del género de terror. Colecciona ediciones físicas y reseña juegos en su canal de YouTube."
    }
]

async function seed() {
    try {
        await client.connect()
        console.log("Conectado a MongoDB")

        await db.collection("games").deleteMany({})
        await db.collection("gamers").deleteMany({})

        const gamesResult = await db.collection("games").insertMany(games)
        console.log(`✅ ${gamesResult.insertedCount} juegos insertados`)

        const gamersResult = await db.collection("gamers").insertMany(gamers)
        console.log(`✅ ${gamersResult.insertedCount} gamers insertados`)

    } catch (error) {
        console.error("Error al seedear:", error)
    } finally {
        await client.close()
        console.log("Conexión cerrada")
    }
}

seed()
