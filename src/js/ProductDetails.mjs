import {addProductToCart, fixImageUrl, addBreadcrumbItem } from "./utils.mjs";

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
      .addEventListener("click", addProductToCart(this.productId));
    // add the product details to the breadcrumb
    addBreadcrumbItem(this.product.Category || "Uncategorized", `/product_listing/index.html?category=${this.product.Category || ""}`);
    addBreadcrumbItem(this.product.NameWithoutBrand || this.product.Name || "Unknown Product", `/product_pages/index.html?product=${this.product.Id || ""}`);
  }

  

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
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
