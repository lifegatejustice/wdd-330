import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const productDetails = new ProductDetails(productID, dataSource);

productDetails.init().then(() => {
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
});

function addProductToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  cartItems.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
}

function addToCartHandler() {
  addProductToCart(productDetails.product);
}
