const container = document.querySelector('.grid');
fetch('./sources/database/data.json')
    .then(response => response.json())
    .then((games)=>{
        games.forEach(game=>{
            const card = document.createElement('article')
            card.classList.add("card");
            card.dataset.id=game.id;
            card.dataset.genre =game.genre.toLowerCase();
            card.dataset.platforms =game.platforms.join(',');
            card.dataset.tags=game.tags.join(',');
            
            const maxLength = 140;
            let description = game.description;
            if (description.length > maxLength) {
            description = description.substring(0, maxLength) + '...';
            }

            card.innerHTML=`
            <div class="imgcard" style="background-image: url('${game.cover}')"></div>
            <div class="card-content">
                <div class="pretitle">
                    <h3 class="game-genre">${game.genre}</h3>
                    <div class="rate"><h4>${game.rating}<span> ★</span></h4></div>
                </div>
                <h2 class="game-title">${game.title}</h2>
                <p>${description}</p>
            <div class="tags">
                ${game.tags.map(tag=>`<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="platform">
                ${game.platforms.map(platform=>`<span class="platform-icon">${platform}</span>`).join('')}
            </div>
         </div>
         `;

         container.appendChild(card);
    
            
         const platforms = document.querySelectorAll('.platform span');
         const bgMap = {
            ps5: 'var(--bg-ps)',
            xbox: 'var(--bg-xbox)',
            pc: 'var(--bg-pc)',
            switch: 'var(--bg-nintendo)'
         };

         platforms.forEach(platform => {
            const key = platform.textContent.toLowerCase();
            platform.style.backgroundColor = bgMap[key] || 'var(--bg-other)';
         });

         card.addEventListener('click', () => {
         window.location.href = `game-page.html?id=${game.id}`;
        });



    });
})

