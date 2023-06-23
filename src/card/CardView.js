import React from "react";
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

const CardView = ({ card, deleteCard }) => {
  const { path, url } = useRouteMatch();
  const { deckId } = useParams();

  return (
    <article className="card">
      <div className="border card-body">
        <div style={{ display: "flex" }}>
          <p style={{ flex: "1" }}>{card.front}</p>
          <p style={{ flex: "1" }}>{card.back}</p>
        </div>
        <div className="buttonGroup" style={{ float: "right" }}>
          <button type="button" className="btn btn-secondary">
            <Link className="linkColor" to={`${url}/cards/${card.id}/edit`}>
              {" "}
              <Icon.Pencil /> Edit
            </Link>
          </button>
          <button
            name="delete"
            type="button"
            className="btn btn-danger"
            onClick={deleteCard}
          >
            <Icon.Trash3 />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardView;
