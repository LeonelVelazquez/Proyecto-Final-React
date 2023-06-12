import React, { createContext, useState } from 'react';

export const cartContext = createContext();

 export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([]);


    const texto = "text"

    return (
        <cartContext.Provider value={{ cart, texto }}>
            {children}
        </cartContext.Provider>
    );
};