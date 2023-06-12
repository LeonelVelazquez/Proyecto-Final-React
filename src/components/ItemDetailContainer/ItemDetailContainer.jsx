import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleItem } from '../../services/mockAsyncService';
import { getItems, getItemsPromise } from '../../services/firebase';
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import ItemCount from '../ItemCount/ItemCount';
import "./ItemDetail.css"
import { CartContext } from '../../storage/cartContext';
import Loader from '../Loader/Loader';

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
      setStock(stock - qty); // Disminuye el stock en la cantidad seleccionada
    } else {
      alert('No hay suficiente stock disponible');
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  getItems();

  useEffect(() => {
    getSingleItem(itemid).then((respuesta) => {
      setItem(respuesta);
      setIsLoading(false);
    });
  }, [itemid]);

  // Al cargar la página, obtén el estado del stock guardado desde localStorage (si existe)
  useEffect(() => {
    const savedStock = localStorage.getItem('stock');
    if (savedStock) {
      setStock(parseInt(savedStock));
    }
  }, []);

  // Guarda el estado del stock en localStorage cuando haya cambios
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
