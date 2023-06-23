import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
export const CreateDeckNav = () => (
  <nav>
    <button type="button" className="btn btn-secondary">
      <Link className="linkColor" to="/decks/new">
        <Icon.PlusLg /> Create Deck
      </Link>
    </button>
  </nav>
);

export default CreateDeckNav;
