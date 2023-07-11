import { useState, useContext } from "react";
import { db } from "../../services/configs";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Checkout.css";
import { CartContext } from "../../storage/cartContext";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [ordenId, setOrdenId] = useState("");

  console.log(cart);

  const manejadorFormulario = async (event) => {
    event.preventDefault();
    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor complete todos los campos");
      return;
    }
    if (email !== emailConfirmacion) {
      setError("Los emails no coinciden");
      return;
    }

    const productosOrden = cart.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
    }));

    const pedido = {
      cliente: {
        nombre,
        apellido,
        telefono,
        email,
        emailConfirmacion,
      },
      productos: productosOrden,
    };

    addDoc(collection(db, "orders"), pedido)
      .then((docRef) => {
        const orderId = docRef.id;
        alert(orderId);
        clearCart();
        setNombre("");
        setEmail("");
        setTelefono("");
        setOrdenId(orderId);
      })
      .catch((error) => {
        console.error("Error al guardar la orden:", error);
      });
  };

  console.log("ordenId:", ordenId);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={manejadorFormulario}>
        <hr />

        <div className="checkout-form-field">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="checkout-form-field">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="checkout-form-field">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="checkout-form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="checkout-form-field">
          <label htmlFor="emailConfirmacion">Confirmar Email</label>
          <input
            type="email"
            id="emailConfirmacion"
            value={emailConfirmacion}
            onChange={(e) => setEmailConfirmacion(e.target.value)}
          />
        </div>

        {error && <p className="checkout-error">{error}</p>}
        <button type="submit" className="checkout-button">
          Finalizar Compra
        </button>
      </form>

      {ordenId && (
        <div>
          <strong className="checkout-success">
            ¡Gracias por tu compra! Tu número de orden es {ordenId}
          </strong>
          <h3>Productos en tu orden:</h3>
          <ul>
            {cart.map((producto) => (
              <li key={producto.id}>{producto.nombre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Checkout;
