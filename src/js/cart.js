import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = qs(".product-list");

  if (!cartItems.length) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Add event listeners to all remove buttons
  productList.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

function cartItemTemplate(item) {
  const imageSrc = item.Image || "";
  const imageAlt = item.Name || "Product image";
  const productName = item.Name || "Unknown product";
  const productColor = (item.Colors && item.Colors[0] && item.Colors[0].ColorName) || "N/A";
  const productPrice = item.FinalPrice !== undefined ? `$${item.FinalPrice}` : "Price not available";
  const productId = item.Id || "";

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${imageAlt}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${productName}</h2>
  </a>
  <p class="cart-card__color">${productColor}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">${productPrice}</p>
  <button class="remove-item" data-id="${productId}">X</button>
</li>`;

  return newItem;
}

function removeFromCart(e) {
  const id = e.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];

  // Filter out the item to remove
  cartItems = cartItems.filter((item) => item.Id !== id);

  // Update localStorage and re-render
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
