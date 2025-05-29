export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.itemCount = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = JSON.parse(localStorage.getItem(this.key) || "[]");
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = 0;
    this.itemCount = 0;
    this.list.forEach(item => {
      const price = item.FinalPrice || 0;
      const qty = item.Quantity || 0;
      this.itemTotal += price * qty;
      this.itemCount += qty;
    });
    const subtotalElem = document.querySelector(`${this.outputSelector} #summary-subtotal`);
    const itemCountElem = document.querySelector(`${this.outputSelector} #summary-item-count`);
    if (subtotalElem) {
      subtotalElem.textContent = this.itemTotal.toFixed(2);
    }
    if (itemCountElem) {
      itemCountElem.textContent = this.itemCount;
    }
  }

  calculateOrderTotal() {
    // Tax: 6% of subtotal
    this.tax = this.itemTotal * 0.06;
    // Shipping: $10 for first item + $2 for each additional item
    if (this.itemCount > 0) {
      this.shipping = 10 + (this.itemCount - 1) * 2;
    } else {
      this.shipping = 0;
    }
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElem = document.querySelector(`${this.outputSelector} #summary-tax`);
    const shippingElem = document.querySelector(`${this.outputSelector} #summary-shipping`);
    const totalElem = document.querySelector(`${this.outputSelector} #summary-total`);
    if (taxElem) {
      taxElem.textContent = `$${this.tax.toFixed(2)}`;
    }
    if (shippingElem) {
      shippingElem.textContent = `$${this.shipping.toFixed(2)}`;
    }
    if (totalElem) {
      totalElem.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  }
}
