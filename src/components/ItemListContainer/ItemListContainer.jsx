import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../services/configs";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import "../ItemListContainer/ItemListContainer.css";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("");

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
      setItems(datosProductos);
      setIsLoading(false);
    };

    obtenerProductos();
  }, [id]);

  const handleFilter = (event) => {
    const selectedRange = event.target.value;
    setPriceRange(selectedRange);
  };

  const filteredItems = items.filter((item) => {
    if (priceRange === "all") {
      return true;
    }
    const [min, max] = priceRange.split("-");
    const price = parseFloat(item.price);
    return price >= parseFloat(min) && price <= parseFloat(max);
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="price-filter">
        <label htmlFor="priceRange">Filtro de Precios:</label>
        <select id="priceRange" value={priceRange} onChange={handleFilter}>
          <option value="all">TODOS</option>
          <option value="1000-2000">$1000 - $2000</option>
          <option value="3000-4000">$3000 - $4000</option>
          <option value="4000-5000">$4000 - $5000</option>
        </select>
      </div>

      <ItemList item={filteredItems} />
    </div>
  );
}

export default ItemListContainer;
