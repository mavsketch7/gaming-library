document.addEventListener('DOMContentLoaded',()=>{
    
    const selectCategory = document.getElementById('genre-select');
    selectCategory.addEventListener('change',applyFilter);

function applyFilter() {
    const cardgames = document.querySelectorAll('.card');
    const selectedCategory = selectCategory.value;

    cardgames.forEach (card => {
        const genre = card.dataset.genre;
        if (selectedCategory === 'all' || genre === selectedCategory) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    })
    
};
});