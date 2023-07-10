import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../../storage/cartContext';
import "./navbar.css";
import ItemCount from "../ItemCount/ItemCount";
function Navbar() {
  const { getTotalItem } = useContext(CartContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(evt.target.elements.username.value);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="./Favicon.png" alt="logo" width="70px" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse mz" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/vasos">
                Vasos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/remeras">
                Remeras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/tazas">
                Tazas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/set">
                Set de Jardin
              </Link>
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            <label>
              Ingrese usuario:
              <input name="username" placeholder="username" />
            </label>
            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
          </form>

          <Link to="/cart" className="navbar-brand">
            <span role="img" aria-label="Cart">
              🛒
            </span>
            {getTotalItem()}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


/*
<form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>*/