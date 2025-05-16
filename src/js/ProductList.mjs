function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/${product.Id}">
        <img
          src="${product.Image}"
          alt="${product.Name}"
          class="product-card__image"
        />
        ${product.Brand.LogoSrc ? 
          `<img src="${product.Brand.LogoSrc}" alt="${product.Brand.Name} logo" class="product-card__brand-logo">` : 
          `<h3 class="product-card__brand">${product.Brand.Name}</h3>`
        }
        <h2 class="product-card__name">${product.Name}</h2>
        <div class="product-card__pricing">
          ${product.ListPrice !== product.FinalPrice ? 
            `<span class="product-card__original-price">$${product.ListPrice.toFixed(2)}</span>` : 
            ''
          }
          <span class="product-card__price">$${product.FinalPrice.toFixed(2)}</span>
        </div>
        <div class="product-card__colors">
          {/* eslint-disable-next-line quotes */}
          ${product.Colors.map(color => 
            `<span class="color-swatch" style="background-color: ${color.ColorCode}" 
                  title="${color.ColorName}"></span>`
          ).join("")}
        </div>
        <p class="product-card__description">${product.DescriptionHtmlSimple}</p>
      </a>
    </li>
  `;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }


  async init() {
    const products = await this.dataSource.getData();
    this.renderProductList(products);
  }

  renderProductList(products) {
    renderListWithTemplate(
      this.generateProductCard.bind(this),
      this.listElement,
      products,
      "afterbegin",
      true
    );


  generateProductCard(product) {
    return productCardTemplate(product);
  }

}
}