const container = document.querySelector('.container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
let maxPage = null;

function loadCharacters(page) {
  container.innerHTML = 'Завантаження...';

  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(res => res.json())
    .then(data => {
      maxPage = data.info.pages;

      container.innerHTML = '';

      data.results.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('character');

        card.innerHTML = `
          <img src="${character.image}" alt="${character.name}">
          <h2 class="character-name">${character.name}</h2>
          <p class="character-status">${character.status} — ${character.species}</p>
        `;

        container.appendChild(card);
      });

      // Управління станом кнопок
      prevBtn.disabled = (page === 1);
      nextBtn.disabled = (page === maxPage);
    })
    .catch(() => {
      container.innerHTML = '<p style="color:red;">Помилка завантаження даних</p>';
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

// Початкове завантаження
loadCharacters(currentPage);
