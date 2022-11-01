import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

export const ItemCart = ({ item }) => {
  // Traemos del context las funciones para agregar y sacar productos del carrito
  const { editItemToCart, trashItemToCart } = useContext(CartContext);

  // Desestructuramos el item
  const { amount, stock} = item;

  return (
    <div className={styles.cartItem}>
      <img src={item.img} alt={item.name} />
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.name} - {item.provider}</p>
          <div className={styles.buttons}>
            <button className={styles.add} onClick={() => editItemToCart(item._id, "add", amount, stock)}>
              +
            </button>
            <button className={styles.quit} onClick={() => editItemToCart(item._id, "del", amount, stock)}>
              -
            </button>
            <button className={styles.trash} onClick={() => trashItemToCart(item._id)}>
              🗑️
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.amount}</div>
          <p className={styles.stock}>Stock: {item.stock} </p>
          <p>Total: ${item.amount * item.price}</p>
        </div>
      </div>
    </div>
  );
};
