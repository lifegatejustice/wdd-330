import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productList = qs(".product-list");
  productList.innerHTML = htmlItems.join("");

  // Add event listeners to all remove buttons
  productList.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <small class="cart-card__color">${item.Colors[0].ColorName}</small>
  <table class="card__table">
    <thead>
      <th>Qty</th>
      <th>Unit price</th>
      <th>Subtotal</th>
      <th>Delete</th>
    </thead>
    <tbody>
      <tr>
        <td>${item.Quantity}</td>
        <td>$${item.FinalPrice}</td>
        <td>$${(item.FinalPrice * item.Quantity).toLocaleString("en")}</td>
        <td><button class="remove-item" title="remove item" data-id="${item.Id}">X</button></td>
      </tr>
    </tbody>
  </table>
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
