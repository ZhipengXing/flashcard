import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import * as Icon from "react-bootstrap-icons";
export const DeckEdit = () => {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { deckName } = location.state;
  console.log(deckName);
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .then(() => setLoading(false))
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  const handleChange = ({ target }) => {
    const value = target.value;
    setDeck({ ...deck, [target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("submitted", deck);
    await updateDeck(deck);
    history.push(`/decks/${deckId}`);
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          {/* here deck name will change instantaneously, how to resolve? */}
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <div>
        <h3>Edit Deck</h3>
        <form name="deckEdit" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={deck.name}
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
              defaultValue={deck.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="buttonGroup">
            <button type="button" className="btn btn-secondary">
              <Link className="linkColor" to={`/decks/${deckId}`}>
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

export default DeckEdit;
