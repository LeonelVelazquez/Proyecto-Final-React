import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/configs';
import { CartContext } from '../../storage/cartContext';
import Loader from '../Loader/Loader';
import ItemCount from "../ItemCount/ItemCount"
import "./ItemDetail.css"

function ItemDetailContainer() {
  const [item, setItem] = useState({});
  const [stock, setStock] = useState(0);
  const { itemid } = useParams();
  const { cart, addItem, removeItem } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);

  const onAdd = (qty) => {
    if (stock >= qty) {
      setIsInCart(true);
      alert(`Agregaste ${item.title} al carrito`);
      addItem(item, qty);
      setStock(prevStock => prevStock - qty); 
    } else {
      alert('No hay suficiente stock disponible');
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemDoc = doc(db, 'Productos', itemid);
        const itemSnapshot = await getDoc(itemDoc);
        if (itemSnapshot.exists()) {
          setItem({ id: itemSnapshot.id, ...itemSnapshot.data() });
        } else {
          console.log('El artículo no existe');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener el detalle del artículo:', error);
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [itemid]);

  useEffect(() => {
    const savedStock = localStorage.getItem('stock');
    if (savedStock) {
      setStock(parseInt(savedStock));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stock', stock.toString());
  }, [stock]);

  if (isLoading) {
    return <center><Loader /></center>;
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
          <small><strong>stock: {stock}</strong></small>
          <small><ItemCount onAdd={onAdd} initial={1} stock={stock} /></small>
          <small><button className='button-primary_remove' onClick={() => removeItem(item.id)}>Eliminar</button></small>
          <br />
          <Link to="/cart">
            <small><button className='button-primary'>Ir al carrito</button></small>
          </Link>
        </div>
      </div>
    </center>
  );
}

export default ItemDetailContainer;
