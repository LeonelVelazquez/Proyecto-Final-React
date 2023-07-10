import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../services/configs";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

function ItemListContainer() {
  const [item, setItem] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      let productosQuery = query(collection(db, "Productos"));

      if (id) {
        productosQuery = query(productosQuery, where("category", "==", id));
      }

      const querySnapshot = await getDocs(productosQuery);
      const datosProductos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItem(datosProductos);
      setIsLoading(false);
    };

    obtenerProductos();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <ItemList item={item} />
    </div>
  );
}

export default ItemListContainer;

 /*useEffect(() => {
    getItems().then((respuesta) => {
      if (id) {
        setItem(respuesta.filter((prod) => prod.category === id))
      } else {

        setItem(respuesta)
        setIsLoading(false)
      }
    });
  }, [id]);

  if (isLoading)

    return( 
    <center><Loader/></center>)

  return (
    
      <div>
        <ItemList item={item} />
      </div>
    
  )*/
