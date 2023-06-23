import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import * as Icon from "react-bootstrap-icons";
const DeckView = ({ deck, deleteDeck }) => {
  return (
    <article className="card">
      <div className="border card-body">
        <div className="deckHeading">
          <h3>{deck.name}</h3>
          <p>{deck.cards.length} cards</p>
        </div>
        <p>{deck.description}</p>
        <div className="buttonGroup">
          <button type="button" className="btn btn-secondary">
            <Link className="linkColor" to={`/decks/${deck.id}`}>
              <Icon.Eye /> View
            </Link>
          </button>
          <button type="button" className="btn btn-primary">
            <Link className="linkColor" to={`/decks/${deck.id}/study`}>
              <Icon.JournalBookmarkFill /> Study
            </Link>
          </button>
        </div>
        <button
          name="delete"
          onClick={deleteDeck}
          type="button"
          className="btn btn-danger trash"
        >
          <Icon.Trash3 />
        </button>
      </div>
    </article>
  );
};

export default DeckView;
