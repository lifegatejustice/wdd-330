import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/cart.html"),
        checkout: resolve(__dirname, "src/cart/checkout.html"),
        product: resolve(__dirname, "src/product_pages/product.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
