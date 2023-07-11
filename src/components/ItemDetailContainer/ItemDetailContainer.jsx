import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../services/configs";
import { CartContext } from "../../storage/cartContext";
import Loader from "../Loader/Loader";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";

function ItemDetailContainer() {
  const [item, setItem] = useState({});
  const { itemid } = useParams();
  const { addItem, removeItem } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onAdd = async (qty) => {
    if (item.stock >= qty) {
      setIsInCart(true);
      alert(`Agregaste ${item.title} al carrito`);
      addItem(item, qty);

      const itemRef = doc(db, "Productos", itemid);
      await updateDoc(itemRef, {
        stock: item.stock - qty,
      });
    } else {
      alert("No hay suficiente stock disponible");
    }
  };

  useEffect(() => {
    const itemDoc = doc(db, "Productos", itemid);
    const unsubscribe = onSnapshot(itemDoc, (itemSnapshot) => {
      if (itemSnapshot.exists()) {
        setItem({ id: itemSnapshot.id, ...itemSnapshot.data() });
      } else {
        console.log("El artículo no existe");
      }
    });

    return () => unsubscribe();
  }, [itemid]);

  useEffect(() => {
    setIsLoading(false);
  }, [item]);

  if (isLoading) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  return (
    <center>
      <div className="card-detail_main">
        <div className="card-detail_img">
          <img src={item.imgurl} alt={item.title} />
        </div>
        <div className="card-detail_detail">
          <h1>{item.title}</h1>
          <h4 className="priceTag"> $ {item.price}</h4>

          <br />
          <small>{item.detail}</small>
          <br />
          <p>stock: {item.stock}</p>
          <small>
            <ItemCount onAdd={onAdd} initial={1} stock={item.stock} />
          </small>
          <small>
            <button
              className="button-primary_remove"
              onClick={() => removeItem(item.id)}
            >
              Eliminar
            </button>
          </small>
          <br />
          <Link to="/cart">
            <small>
              <button className="button-primary">Ir al carrito</button>
            </small>
          </Link>
        </div>
      </div>
    </center>
  );
}

export default ItemDetailContainer;
