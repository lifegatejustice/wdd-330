import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || "tents";
}

function updateCategoryTitle(category) {
  const titleElement = document.getElementById("categoryTitle");
  if (titleElement) {
    // Capitalize first letter and replace hyphens with spaces
    const formattedCategory = category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    titleElement.textContent = `${formattedCategory} Products`;
  }
}

async function init() {
  const category = getCategoryFromUrl();
  updateCategoryTitle(category);

  const dataSource = new ProductData(category);
  const listElement = document.querySelector(".product-list");

  const productList = new ProductList(category, dataSource, listElement);
  await productList.init();
}

init();
