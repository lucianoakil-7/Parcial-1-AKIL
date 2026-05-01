// ── LAYOUT BASE ───────────────────────────────────────────────────────────────
export function createPage(title, body) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | GameVault</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #0f0f1a; color: #e0e0e0; }
        header { background: #1a1a2e; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #7c3aed; }
        header h1 { color: #a78bfa; font-size: 1.6rem; letter-spacing: 2px; }
        nav { display: flex; gap: 12px; flex-wrap: wrap; }
        nav a { color: #c4b5fd; text-decoration: none; padding: 6px 14px; border-radius: 20px; border: 1px solid #4c1d95; transition: all .2s; font-size: .9rem; }
        nav a:hover { background: #7c3aed; color: #fff; border-color: #7c3aed; }
        main { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        h2 { color: #a78bfa; margin-bottom: 28px; font-size: 1.8rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
        .card { background: #1a1a2e; border-radius: 12px; overflow: hidden; border: 1px solid #2d2d4e; transition: transform .2s, box-shadow .2s; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(124,58,237,.3); }
        .card img { width: 100%; height: 160px; object-fit: cover; }
        .card-body { padding: 16px; }
        .card-body h3 { color: #c4b5fd; margin-bottom: 8px; font-size: 1.1rem; }
        .card-body p { font-size: .85rem; color: #9ca3af; line-height: 1.5; margin-bottom: 10px; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .tag { background: #2e1065; color: #c4b5fd; padding: 3px 10px; border-radius: 12px; font-size: .75rem; }
        .card-body a { color: #818cf8; font-size: .85rem; text-decoration: none; }
        .card-body a:hover { text-decoration: underline; }
        .badge { display: inline-block; background: #4c1d95; color: #c4b5fd; padding: 4px 12px; border-radius: 12px; font-size: .78rem; margin-bottom: 10px; }
        footer { text-align: center; padding: 24px; color: #4b5563; font-size: .82rem; border-top: 1px solid #1f2937; margin-top: 60px; }
    </style>
</head>
<body>
    <header>
        <h1>🎮 GameVault</h1>
        <nav>
            <a href="/">Inicio</a>
            <a href="/seccion/action">Action</a>
            <a href="/seccion/rpg">RPG</a>
            <a href="/seccion/strategy">Strategy</a>
            <a href="/seccion/sports">Sports</a>
            <a href="/seccion/horror">Horror</a>
        </nav>
    </header>
    <main>
        ${body}
    </main>
    <footer>GameVault &copy; 2025 — Aplicaciones Híbridas</footer>
</body>
</html>`
}

export function createGameCard(game) {
    const platforms = Array.isArray(game.platforms)
        ? game.platforms.map(p => `<span class="tag">${p}</span>`).join("")
        : ""
    return `
    <div class="card">
        <img src="${game.img || 'https://picsum.photos/400/225?random=' + game._id}" alt="${game.name}">
        <div class="card-body">
            <span class="badge">${game.section?.toUpperCase() || "GAME"}</span>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="tags">${platforms}</div>
            <p><strong style="color:#c4b5fd">Dev:</strong> ${game.developer}</p>
            <a href="${game.link}" target="_blank">🔗 Ver en Steam / repositorio</a>
        </div>
    </div>`
}

export function createGameGrid(games, titulo = "Juegos") {
    if (!games.length) {
        return `<h2>${titulo}</h2><p style="color:#6b7280">No hay juegos en esta sección todavía.</p>`
    }
    const cards = games.map(createGameCard).join("")
    return `<h2>${titulo}</h2><div class="grid">${cards}</div>`
}
