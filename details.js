const container = document.getElementById('details-container');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('data.json')
  .then(res => res.json())
  .then(products => {
    const product = products.find(p => p.id == productId);
    if (!product) {
      container.innerHTML = '<p>❌ Товар не знайдено</p>';
      return;
    }

    container.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h1>${product.title}</h1>
      <p>${product.description}</p>
      <p class="price">$${product.price}</p>
      <button id="add-to-cart">Додати в корзину</button>
    `;

    document.getElementById('add-to-cart').addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`✅ ${product.title} додано в корзину!`);
    });
  });
