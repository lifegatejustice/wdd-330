 import { renderListWithTemplate } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

function fixImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/")) {
    return url;
  }
  return baseURL + url;
}

function productCardTemplate(product) {
  const imageUrl = fixImageUrl(product.Images?.PrimaryMedium || product.Image || "");
  return "<li class=\"product-card\">" +
    "<a href=\"/product_pages/product.html?product=" + product.Id + "\">" +
    "<img src=\"" + imageUrl + "\" alt=\"" + (product.Name || "") + "\">" +
    "<h2>" + (product.Brand?.Name || "") + "</h2>" +
    "<h3>" + (product.Name || "") + "</h3>" +
    "<p class=\"product-card__price\">$" + (product.FinalPrice || "") + "</p>" +
    "</a>" +
    "</li>";
}   

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);
  }

  renderList(list) {
    //refactored render list from util js
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  async sortAndRender(sortBy) {
    let sortedProducts = [...this.products];
    if (sortBy === "name") {
      sortedProducts.sort((a, b) => {
        const nameA = (a.Name || "").toLowerCase();
        const nameB = (b.Name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (sortBy === "price") {
      sortedProducts.sort((a, b) => {
        const priceA = a.FinalPrice || 0;
        const priceB = b.FinalPrice || 0;
        return priceA - priceB;
      });
    }
    this.renderList(sortedProducts);
  }
}
