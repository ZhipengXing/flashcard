import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import * as Icon from "react-bootstrap-icons";
export const CreateDeck = () => {
  const initialFromData = {
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState({ ...initialFromData });
  const history = useHistory();
  const handleChange = ({ target }) => {
    const value = target.value;
    setDeck({ ...deck, [target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted", deck);
    await createDeck(deck);
    history.push("/");
  };

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/`}>
              <Icon.HouseDoorFill /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <div>
        <h3>Create Deck</h3>
        <form name="deckCreate" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              type="text"
              name="name"
              value={deck.name}
              placeholder="Deck Name"
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              id="description"
              type="text"
              name="description"
              value={deck.description}
              placeholder="Brief description of the deck"
              onChange={handleChange}
              required
            />
          </div>
          <div className="buttonGroup">
            <button type="button" className="btn btn-secondary">
              <Link className="linkColor" to={`/`}>
                Cancel
              </Link>
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateDeck;
