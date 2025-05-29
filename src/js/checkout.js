import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

function validateForm(form) {
  const inputs = form.querySelectorAll("input[required]");
  for (const input of inputs) {
    if (!input.value.trim()) {
      return false;
    }
    if (input.pattern) {
      const regex = new RegExp(input.pattern);
      if (!regex.test(input.value.trim())) {
        return false;
      }
    }
  }
  return true;
}

function setupFormValidation() {
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) {
      alert("Please fill out all fields correctly before submitting.");
      return;
    }
    alert("Order placed successfully!");
    form.reset();
    // Optionally clear cart after successful checkout
    localStorage.removeItem("so-cart");
    checkoutProcess.updateOrderSummary({ subtotal: 0, tax: 0, shipping: 0, total: 0 });
  });
}

const checkoutProcess = new CheckoutProcess("so-cart", "#order-summary");

function init() {
  checkoutProcess.init();

  // Calculate order total on page load
  checkoutProcess.calculateOrderTotal();

  const zipInput = document.getElementById("zip-code");
  if (zipInput) {
    zipInput.addEventListener("input", () => {
      checkoutProcess.calculateOrderTotal();
    });
  }

  setupFormValidation();
}

document.addEventListener("DOMContentLoaded", init);
