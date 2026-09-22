const breadcrumbs = document.querySelector('#breadcrumbs');
const titleEl = document.querySelector('#game-title');
const content = document.querySelector('#game-content');

// 1. Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');

if (!gameId) {
    content.innerHTML = '<p>Juego no encontrado</p>';
    throw new Error('No game ID in URL');
}

// 2. Fetch del JSON
fetch('./sources/database/data.json')
    .then(response => response.json())
    .then(games => {

        // 3. Buscar el juego por ID
        const game = games.find(g => g.id === gameId);

        if (!game) {
            content.innerHTML = '<p>Juego no encontrado</p>';
            return;
        }

        // 4. Breadcrumbs
        breadcrumbs.innerHTML = `
            <a href="index.html">Home</a> &gt; 
            <span>${game.title}</span>
        `;

        // 5. Título
        titleEl.textContent = game.title;

        // 6. Render principal (MISMA ESTRUCTURA QUE TU HTML)
        content.innerHTML = `
            <div class="left-column">

                <div class="trailer-game">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="${game.trailer.replace('watch?v=', 'embed/')}"
                        title="${game.title} trailer"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>
                </div>

                <div class="gallery">
                    ${game.gallery.images.map(img => `
                        <img src="${img}" alt="${game.title}">
                    `).join('')}
                </div>

            </div>

            <div class="right-sidebar">

                <div class="portrait-game">
                    <img src="${game.cover}" alt="${game.title} cover">

                    <div class="game-details">

                        <div class="game-description">
                            <p>${game.extendedDescription}</p>
                        </div>

                        <p><strong>Genre:</strong> ${game.genre}</p>
                        <p><strong>Release Date:</strong> ${game.releaseDate}</p>
                        <p><strong>Developer:</strong> ${game.developer}</p>
                        <p><strong>Publisher:</strong> ${game.publisher}</p>
                        <p><strong>Playtime:</strong> ${game.playtimeEstimate}</p>

                        <div class="platform">
                            <p><strong>Platform:</strong></p>
                            ${game.platforms.map(p => `<span>${p}</span>`).join('')}
                        </div>

                        <div class="tags">
                            <strong>Tags:</strong>
                            ${game.tags.map(tag => `
                                <span class="tag">${tag}</span>
                            `).join('')}
                        </div>

                    </div>
                </div>

            </div>
        `;
    })
    .catch(err => {
        content.innerHTML = '<p>Error cargando el juego</p>';
        console.error(err);
    });
