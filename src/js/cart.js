import { qs, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartElement = qs(".product-list");
const cart = new ShoppingCart(cartElement);
cart.init();

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart") || [];
//   const productList = qs(".product-list");

//   // Empty-cart message
//   if (!cartItems.length) {
//     productList.innerHTML = "<p>Your cart is empty.</p>";
//     return;
//   }

//   // Build each item row and track running total
//   let total = 0;
//   const htmlItems = cartItems.map((item) => {
//     const price = item.FinalPrice || 0;
//     const qty = item.Quantity || 0;
//     const subtotal = price * qty;
//     total += subtotal;
//     return cartItemTemplate({ ...item, subtotal });
//   });

//   // Inject items + total
//   productList.innerHTML = `
//     <ul class="cart-items">
//       ${htmlItems.join("")}
//     </ul>
//     <div class="cart-total">
//       <strong>Grand Total:</strong> $${total.toFixed(2)}
//     </div>
//   `;

//   // Wire up the buttons
//   productList
//     .querySelectorAll(".remove-item")
//     .forEach((btn) => btn.addEventListener("click", removeFromCart));
//   productList
//     .querySelectorAll(".increase-item")
//     .forEach((btn) =>
//       btn.addEventListener("click", () => changeQuantity(btn.dataset.id, +1)),
//     );
//   productList
//     .querySelectorAll(".decrease-item")
//     .forEach((btn) =>
//       btn.addEventListener("click", () => changeQuantity(btn.dataset.id, -1)),
//     );
// }

// function cartItemTemplate(item) {
//   return `
//   <li class="cart-card divider">
//     <a href="#" class="cart-card__image">
//       <img src="${item.Image || ""}" alt="${item.Name || "Product image"}" />
//     </a>
//     <a href="#"><h2 class="card__name">${item.Name || "Unknown"}</h2></a>
//     <small class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</small>
//     <table class="card__table">
//       <thead>
//         <tr>
//           <th>Qty</th>
//           <th>Unit price</th>
//           <th>Subtotal</th>
//           <th>Delete</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>
//             <button class="decrease-item" data-id="${item.Id}">–</button>
//             ${item.Quantity}
//             <button class="increase-item" data-id="${item.Id}">+</button>
//           </td>
//           <td>$${(item.FinalPrice ?? 0).toFixed(2)}</td>
//           <td>$${(item.subtotal ?? 0).toFixed(2)}</td>
//           <td>
//             <button class="remove-item" data-id="${item.Id}">×</button>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </li>`;
// }

// function removeFromCart(e) {
//   const id = e.target.dataset.id;
//   let items = getLocalStorage("so-cart") || [];
//   const idx = items.findIndex((i) => i.Id === id);
//   if (idx > -1) {
//     items.splice(idx, 1);
//     setLocalStorage("so-cart", items);
//     renderCartContents();
//   }
// }

// function changeQuantity(id, delta) {
//   let items = getLocalStorage("so-cart") || [];
//   const idx = items.findIndex((i) => i.Id === id);
//   if (idx > -1) {
//     const newQty = (items[idx].Quantity || 0) + delta;
//     if (newQty < 1) {
//       // if you prefer auto-remove when <1:
//       items.splice(idx, 1);
//     } else {
//       items[idx].Quantity = newQty;
//     }
//     setLocalStorage("so-cart", items);
//     renderCartContents();
//   }
// }

// // initial render
// renderCartContents();
