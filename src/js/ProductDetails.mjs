import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    //inspect the cart if product is in cart
    const itemInCart = cartItems.find(item => item.Id === this.productId)
    if (itemInCart) {
      // increment quantity if item in cart
      itemInCart.Quantity++;
    } else {
      // adding 'Quantity' key to product object before pushing it to cart.
      // this helps when adjusting quantities in the cart.
      this.product["Quantity"] = 1;
      cartItems.push(this.product);
    }
    setLocalStorage("so-cart", cartItems);
    // update the cart count in the header
    updateCartCount();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

const baseURL = import.meta.env.VITE_SERVER_URL;

function fixImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/")) {
    return url;
  }
  return baseURL + url;
}



function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand?.Name || "";
  document.querySelector("h3").textContent = product.NameWithoutBrand || product.Name || "";

  const productImage = document.getElementById("productImage");
  const imageUrl = fixImageUrl(product.Images?.PrimaryLarge || product.Image || "");
  productImage.setAttribute("src", imageUrl);
  productImage.setAttribute("alt", product.NameWithoutBrand || product.Name || "");

  document.getElementById("productPrice").textContent = product.FinalPrice ? `$${product.FinalPrice}` : "";
  document.getElementById("productColor").textContent = product.Colors && product.Colors.length > 0 ? product.Colors[0].ColorName : "";
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple || product.Description || "";

  document.getElementById("addToCart").dataset.id = product.Id || "";
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }