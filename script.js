let productsData = [];

fetch('data.json')
  .then(res => res.json())
  .then(products => {
    productsData = products; 
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = '';
    products.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <p class="price">$${p.price}</p>
        <button onclick="location.href='details.html?id=${p.id}'">Детальніше</button>
        <button class="add-btn" data-id="${p.id}">Додати</button>
      `;
      catalog.appendChild(div);
    });
  });


document.addEventListener('click', e => {
  if (e.target.matches('.add-btn')) {
    const id = e.target.dataset.id;
    const product = productsData.find(p => p.id == id);
    if (product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`✅ ${product.title} додано в корзину!`);
    }
  }
});
