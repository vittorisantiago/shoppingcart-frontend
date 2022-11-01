import { createContext, useEffect, useState } from "react";
/* createContext crea un objeto Context, cuando React renderiza un componente. useEffect, nos permite 
definir efectos y useState nos permite añadir el estado de React a un componente de función. */

import axios from "axios"; // Cliente HTTP basado en promesas para node.js y el navegador. Duevuelve datos en JSON

// Creamos el context, se le puede pasar un valor inicial
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Creamos un estado para el carrito
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await axios
      .get("http://localhost:4000/products")
      .then(({ data }) => setProducts(data.products));
  };

  const getProductsCart = async () => {
    return await axios
      .get("http://localhost:4000/products-cart")
      .then(({ data }) => setCartItems(data.productsCart))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProducts();
    getProductsCart();
  }, []);

  const addItemToCart = async (product) => {
    const { name, img, price, provider, stock } = product;

    await axios.post("http://localhost:4000/products-cart", { name, img, price, provider, stock });

    getProducts();
    getProductsCart();
  };

  const editItemToCart = async (id, query, amount, stock) => {
    if (query === "del" && amount === 1) {
      await axios
        .delete(`http://localhost:4000/products-cart/${id}`)
        .then(({ data }) => console.log(data));
    } else if (query === "del" && amount > 1) {
      await axios
        .put(`http://localhost:4000/products-cart/${id}?query=${query}`, {
          amount,
          stock,
        })
        .then(({ data }) => console.log(data));
    } else if (query === "add" && stock > 0) {
      await axios
        .put(`http://localhost:4000/products-cart/${id}?query=${query}`, {
          amount,
          stock,
        })
        .then(({ data }) => console.log(data));
    }

    getProducts();
    getProductsCart();
  };

  const trashItemToCart = async (id) => {
    await axios
    .delete(`http://localhost:4000/products-cart/${id}`)
    .then(({ data }) => console.log(data));

    getProducts();
    getProductsCart();
  };

  return (
    // Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value
    <CartContext.Provider value={{ cartItems, products, addItemToCart, editItemToCart, trashItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
