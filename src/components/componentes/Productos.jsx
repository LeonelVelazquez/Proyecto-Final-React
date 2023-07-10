import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where, doc, runTransaction, onSnapshot } from "firebase/firestore";
import { db } from "../../services/configs";

import "../../components/componentes/Productos.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [precioFiltrado, setPrecioFiltrado] = useState("");

  useEffect(() => {
    obtenerProductos();
    suscribirseACambios();
  }, [precioFiltrado]);

  const obtenerProductos = async () => {
    let productosQuery = query(collection(db, "Productos"));

    if (precioFiltrado) {
      const [minPrecio, maxPrecio] = precioFiltrado.split("-");
      productosQuery = query(
        productosQuery,
        where("precio", ">=", parseInt(minPrecio)),
        where("precio", "<=", parseInt(maxPrecio))
      );
    }

    const querySnapshot = await getDocs(productosQuery);
    const datosProductos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductos(datosProductos);
  };

  const suscribirseACambios = () => {
    const productosRef = collection(db, "Productos");
    const unsubscribe = onSnapshot(productosRef, () => {
      obtenerProductos();
    });

    return unsubscribe;
  };

  const handleChange = (event) => {
    setPrecioFiltrado(event.target.value);
  };

  const handleComprar = async (productoId) => {
    const productoRef = doc(db, "Productos", productoId);
    const producto = productos.find((p) => p.id === productoId);

    if (producto.stock > 0) {
      try {
        await runTransaction(db, async (transaction) => {
          const productoSnapshot = await transaction.get(productoRef);
          const nuevoStock = productoSnapshot.data().stock - 1;

          if (nuevoStock >= 0) {
            transaction.update(productoRef, { stock: nuevoStock });
          }
        });

        const nuevosProductos = productos.map((p) => {
          if (p.id === productoId) {
            return {
              ...p,
              stock: p.stock - 1,
            };
          }
          return p;
        });

        setProductos(nuevosProductos);
      } catch (error) {
        console.log("Error al comprar el producto:", error);
      }
    }
  };

  return (
    <>
      <h2>Mis Productos</h2>
      <div className="productos-container">
        <div className="filtro-precios">
          <label htmlFor="precio-filtrado">Filtrar por precio:</label>
          <select
            id="precio-filtrado"
            value={precioFiltrado}
            onChange={handleChange}
          >
            <option value="">Todos los precios</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101-200">$101 - $200</option>
            {/* Agrega más opciones de acuerdo a tus necesidades */}
          </select>
        </div>

        {productos.map((producto) => (
          <div className="productos-card" key={producto.id}>
            <h2>{producto.titulo}</h2>
            <p>precio: {producto.precio}</p>
            <p>stock: {producto.stock}</p>
            <button onClick={() => handleComprar(producto.id)}>Comprar</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Productos;
