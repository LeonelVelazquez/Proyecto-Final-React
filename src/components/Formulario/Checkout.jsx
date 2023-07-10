import { useState, useContext } from "react";
import { db } from "../../services/configs";
import { collection, addDoc } from "firebase/firestore";
import ItemList from "../ItemList/ItemList";
import { CartContext } from "../../storage/cartContext";
import "./Checkout.css";

const Checkout = () => {
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [ordenId, setOrdenId] = useState("");

  const manejadorFormulario = () => {
    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor complete todos los campos");
      return;
    }
    if (email !== emailConfirmacion) {
      setError("Los emails no coinciden");
      return;
    }

    const orden = {
      items: carrito.map((productos) => ({
        id: productos.item.id,
        nombre: productos.item.nombre,
        cantidad: productos.cantidad
      })),
      total: carrito.reduce(
        (total, productos) =>
          total + productos.item.price * productos.cantidad,
        0
      ),
      nombre,
      apellido,
      telefono,
      email
    };

    addDoc(collection(db, "ordenes"), orden)
      .then((docRef) => {
        setOrdenId(docRef.id);
        vaciarCarrito();
      })
      .catch((error) => {
        setError("Se produjo un error al crear la orden. Vuelva pronto");
      });
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={manejadorFormulario}>
        {carrito.map((productos) => (
          <div key={productos.item.id}>
            <p>
              {productos.item.nombre} x {productos.cantidad}
            </p>
            <p>Price $: {productos.item.price}</p>
            <hr />
          </div>
        ))}

        <hr />

        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="emailConfirmacion">Confirmar Email</label>
          <input
            type="email"
            id="emailConfirmacion"
            value={emailConfirmacion}
            onChange={(e) => setEmailConfirmacion(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Finalizar Compra</button>
      </form>

      {ordenId && (
        <strong>
          ¡Gracias por tu compra! Tu número de orden es {ordenId}
        </strong>
      )}
    </div>
  );
};

export default Checkout;
