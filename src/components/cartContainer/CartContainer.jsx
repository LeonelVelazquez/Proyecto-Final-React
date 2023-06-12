import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../storage/cartContext';
import Button from '../button/Button';
import "./cartContainer.css"


function CartContainer() {
    const { cart, removeItem, getTotalPriceInCart, clearCart } = useContext(CartContext)
   

function handleCheckout(evt){
const item = cart.map( item =>({ 
    id: item.id, 
    title: item.title, 
    price: item.price, 
    count: item.count}))
}

const order = {
    buyer:{
        name: "Leonel",
        email: "Lns@.com",
        phone: 1234,
    },
    items: "",
    date: "",
    total: {getTotalPriceInCart},
    
    
}

   
    return (
<>
        <div>
            <h1>Tu carrito</h1>
            <div className='products-cart'>
                {
                    cart.map(item => (
                        <div className='cart-item'>
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
        <button onClick={handleCheckout}>finalizar compra</button>

        </>
    );

}

export default CartContainer;
