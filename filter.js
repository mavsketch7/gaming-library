//*Filter functionality*//
document.addEventListener('DOMContentLoaded',()=>{
    const inputSearch = document.getElementById('inputsearch');
    const selectCategory = document.getElementById('genre-select'); 
    const tagCheckbox = document.querySelectorAll('input[name="tag-filter"]');

    inputSearch.addEventListener('input', applyFilter);
    selectCategory.addEventListener('change', applyFilter);
    tagCheckbox.forEach(cb=>{cb.addEventListener('change', applyFilter)}); 

    function getSelectedTags(){
        const selectedTags= document.querySelectorAll('input[name="tag-filter"]:checked');
        return Array.from(selectedTags).map(tag=>tag.value.toLowerCase());
    }

function applyFilter() {


        const cardgames = document.querySelectorAll('.card');
        const searchValue = inputSearch.value.toLowerCase();
        const selectedCategory = selectCategory.value.toLowerCase();
        const selectedTags = getSelectedTags();

        cardgames.forEach(card=>{
            const title= card.querySelector('.game-title').textContent.toLowerCase();
            const genre = card.dataset.genre.toLowerCase();
            const tag = card.dataset.tags.toLowerCase().split(',');

            
            if(title.includes(searchValue) && (selectedCategory === 'all' || genre === selectedCategory) && (selectedTags.length === 0 || selectedTags.some(t=> tag.includes(t))) ){
            
                card.classList.remove('hidden');    
            } else {
                card.classList.add('hidden');
            }
        })
};

});


