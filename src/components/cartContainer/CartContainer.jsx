import React, { useContext } from 'react';
import { CartContext } from '../../storage/cartContext';
import Button from '../button/Button';
import "./cartContainer.css";
import { Link } from 'react-router-dom';

function CartContainer() {
  const { cart, removeItem, getTotalPriceInCart, clearCart } = useContext(CartContext);

  function handleCheckout() {
    const items = cart.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      count: item.count
    }));

    const order = {
      buyer: {
        name: "Leonel",
        email: "Lns@.com",
        phone: 1234,
      },
      items: items,
      date: "",
      total: getTotalPriceInCart()
    };


  }

  return (
    <>
      <div>
        <h1>Tu carrito</h1>
        <div className='products-cart'>
          {cart.map(item => (
            <div className='cart-item' key={item.id}>
              <img src={item.imgurl} alt="img" />
              <h3>{item.title}</h3>
              <p>$ {item.price}</p>
              <p>{item.detail}</p>
              <p>{item.count}</p>
              <p>Cantidad: {item.amount}</p>
              <button className='button-primary_clear' onClick={() => removeItem(item.id)}>x</button>
            </div>
          ))}
        </div>
        <p className='total-carrito'>El total de tu compra es de: $ {getTotalPriceInCart()}</p>
      </div>
      <small><button className='button-primary_clear' onClick={() => clearCart()}>Borrar carrito</button></small>
      <br />
      <br />
      <Link to="/checkout">
        <button onClick={handleCheckout}>Finalizar compra</button>
      </Link>
    </>
  );
}

export default CartContainer;
