import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productListElement = document.querySelector(".product-list");

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    productListElement.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productListElement.innerHTML = htmlItems.join("");

  // Add event listeners to remove buttons
  const removeButtons = productListElement.querySelectorAll(".remove-btn");
  removeButtons.forEach(button => {
    button.addEventListener("click", handleRemoveClick);
  });
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <button class="remove-btn" data-id="${item.Id}" aria-label="Remove item">X</button>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function handleRemoveClick(event) {
  const idToRemove = event.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter(item => item.Id !== idToRemove);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
