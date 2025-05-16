import ProductData from "./ProductData.mjs";

// Create instance for tents data
const tentsData = new ProductData("tents");

// Example usage:
tentsData.getData()
  .then(data => console.log("Tents data:", data))
  .catch(err => console.error("Error loading tents:", err));
