import { useState, useEffect } from "react";
import services from "../../services/configs";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../services/configs";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";

import "../../components/componentes/Productos.css"

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {

      
      const querySnapshot = await getDocs(query(collection(db, "Productos")));
      const datosProductos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(datosProductos);
    };

    obtenerProductos();
  }, [productos]);

  return (
    <>
      <h2>Mis Productos</h2>
      <div className="productos-container">
        {productos.map((producto) => (
          <div className="productos-card" key={producto.id}>
            <h2>{producto.titulo}</h2>
            <p>precio{producto.precio}</p>
            <p>stock: {producto.stock}</p>
            <button>Comprar</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Productos;

