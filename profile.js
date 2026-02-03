const container = document.getElementById('characters-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
let maxPage = null;

function loadCharacters(page) {
  container.innerHTML = '<p style="color:#00FCCA; text-align:center;">Завантаження...</p>';

  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(res => res.json())
    .then(data => {
      maxPage = data.info.pages;
      container.innerHTML = '';

      data.results.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character card'; 

        card.innerHTML = `
          <img src="${character.image}" alt="${character.name}" />
          <h3><a href="character-details.html?id=${character.id}">${character.name}</a></h3>
          <p>Статус: ${character.status}</p>
        `;

        container.appendChild(card);
      });

    
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === maxPage;
    })
    .catch(() => {
      container.innerHTML = '<p style="color:red; text-align:center;">Помилка завантаження персонажів</p>';
    });
}


prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
});
 
nextBtn.addEventListener('click', () => {
  if (currentPage < maxPage) {
    currentPage++;
    loadCharacters(currentPage);
  }
});


loadCharacters(currentPage);
