import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./cards.css";

function Cards(props) {
  const { id, title, price, detail, imgurl, stock } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const urlDetail = `/item/${id}`;

  let classToggleBtn;
  if (isFavorite) classToggleBtn = "item-card_favicon favorite";
  else classToggleBtn = "item-card_favicon";

  return (
    <div className="tarjetas">
      <div>
        <Link to={urlDetail}>
          <div className="card-image">
            <img className="image" src={imgurl} alt="Imagen" />
          </div>
        </Link>
        <center>
          <div className="card-content">
            <h3 className="title">{title}</h3>
            <h4 className="price">$ {price}</h4>
            <p className="detail">{detail}</p>
            <p className="detail">{stock}</p>
          </div>
          <Link to={urlDetail}>
            <Button text={"Ver mas"} />
          </Link>
          <button className="favorite-button" onClick={handleFavoriteClick}>
          {isFavorite ? "❤️" : "🤍"}
          </button>
        </center>
      </div>
    </div>
  );
}

export default Cards;
