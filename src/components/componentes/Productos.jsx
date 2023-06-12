import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";


export const db = Productos.firestore();
const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const misProductos = query(collection(db, "Productos"));

        getDocs(misProductos)
            .then((respuesta) => {
                setProductos(respuesta.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            });
    }, []);

    return (
        <>
            <h2>Mis Productos</h2>
            <div className="productos.container">
                {
                    productos.map((producto) => (

                        <div className="product-card" key={producto.id}>
                            <h2>{producto.nombre}</h2>
                            <p>Precio: ${producto.precio}</p>
                            <p>Stock: {producto.stoc}</p>

                        </div>
                    ))}
            </div>
        </>
    );
};

export default Productos;
