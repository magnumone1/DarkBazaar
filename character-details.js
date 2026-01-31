const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const container = document.getElementById('character-details');

fetch(`https://rickandmortyapi.com/api/character/${id}`)
  .then(res => {
    if (!res.ok) throw new Error('Персонаж не знайдений');
    return res.json();
  })
  .then(character => {
    container.innerHTML = `
      <h1>${character.name}</h1>
      <img src="${character.image}" alt="${character.name}" />
      <p><strong>Статус:</strong> ${character.status}</p>
      <p><strong>Вид:</strong> ${character.species}</p>
      <p><strong>Локація:</strong> ${character.location.name}</p>
      <p><strong>Походження:</strong> ${character.origin.name}</p>
    `;
  })
  .catch(err => {
    container.innerHTML = `<p>Помилка: ${err.message}</p>`;
  });
