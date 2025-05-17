import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
// // Example usage:
// tentsData.getData()
//   .then(data => console.log("Tents data:", data))
//   .catch(err => console.error("Error loading tents:", err));

// document.addEventListener("DOMContentLoaded", () => {
//   if ("loading" in HTMLImageElement.prototype) {
//     // Native lazy-loading is supported; nothing else to do.
//     return;
//   }

//   const lazyImages = document.querySelectorAll("img[loading="lazy"]");
//   if ("IntersectionObserver" in window) {
//     const io = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const img = entry.target;
//           img.src = img.dataset.src;
//           observer.unobserve(img);
//         }
//       });
//     });
//     lazyImages.forEach(img => {
//       // swap the src into data-src in your HTML:
//       // <img data-src="…" src="placeholder.jpg" loading="lazy">
//       io.observe(img);
//     });
//   } else {
//     // Fallback: load all images immediately
//     lazyImages.forEach(img => (img.src = img.dataset.src));
//   }
// });
