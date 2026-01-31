document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
  const container = document.getElementById("cart-container");
  const totalPriceEl = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Кошик порожній 🛒</p>";
    totalPriceEl.textContent = "";
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" width="50">
      <strong>${item.title}</strong> — $${item.price}
      <button class="remove-btn" data-index="${index}">❌</button>
    `;

    container.appendChild(div);
    total += item.price;
  });

  totalPriceEl.textContent = `Всього: $${total.toFixed(2)}`;


  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      cart.splice(i, 1); 
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart(); 
    });
  });
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
}
