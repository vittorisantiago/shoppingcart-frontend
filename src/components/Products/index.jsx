import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

const Products = () => {
  // Traemos del context la funcion para agregar un producto
  const { addItemToCart, products } = useContext(CartContext);

  return (
    <div className={styles.productsContainer}>
      {products &&
        products.map((product, i) => (
          <div key={i} className={styles.product}>
            <img src={product.img} alt={product.name} />
            <div>
              <p>
                {product.name} - ${product.price}
              </p>
              <p className={styles.provider}>
                Provider: {product.provider}
              </p>
            </div>
            {!product.inCart ? (
              <button className={styles.agrandar} onClick={() => addItemToCart(product)}>
                Add to Cart
              </button>
            ) : (
              <p className={styles.agregado}>Already in cart</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default Products;
