import { getLocalStorage, setLocalStorage, renderListWithTemplate, loadTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = [];
    this.template = null;
    this.lastClickTime = 0;
  }

  async init() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.template = await loadTemplate("../templates/cartItem.html");
    this.renderList(this.cartItems);
    this.setupEventListeners();
  }

  prepareCartItemTemplate(template, item) {
    return template
      .replace(/{{Image}}/g, item.Image || "")
      .replace(/{{Name}}/g, item.Name || "Unknown product")
      .replace(/{{Color}}/g, (item.Colors?.[0]?.ColorName || "N/A"))
      .replace(/{{FinalPrice}}/g, item.FinalPrice !== undefined ? item.FinalPrice : "0")
      .replace(/{{Quantity}}/g, item.Quantity || 0)
      .replace(/{{Subtotal}}/g, (item.FinalPrice * item.Quantity).toFixed(2))
      .replace(/{{Id}}/g, item.Id || "");
  }

  renderList(list) {
    const templateFn = (item) => this.prepareCartItemTemplate(this.template, item);
    renderListWithTemplate(templateFn, this.listElement, list, "afterbegin", true);
  }

  setupEventListeners() {
    this.listElement.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (e.target.classList.contains("remove-item")) {
        this.removeFromCart(id);
      }
      if (e.target.classList.contains("increase-item")) {
        this.changeQuantity(id, 1);
      } else if (e.target.classList.contains("decrease-item")) {
        this.changeQuantity(id, -1);
      }
    });
  }

  removeFromCart(id) {
    this.cartItems = this.cartItems.filter(item => item.Id !== id);
    setLocalStorage("so-cart", this.cartItems);
    this.renderList(this.cartItems);
  }

  changeQuantity(id, delta) {
    const now = Date.now();
    if (now - this.lastClickTime < 300) return; // debounce
    this.lastClickTime = now;

    const index = this.cartItems.findIndex(item => item.Id === id);
    if (index !== -1) {
      this.cartItems[index].Quantity = Math.max(1, this.cartItems[index].Quantity + delta);
      setLocalStorage("so-cart", this.cartItems);
      this.renderList(this.cartItems);
    }
  }
}
