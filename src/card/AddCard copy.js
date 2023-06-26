import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import * as Icon from "react-bootstrap-icons";
export const AddCard = () => {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { deckId } = useParams();

  const initialFromData = {
    front: "",
    back: "",
  };

  const [card, setCard] = useState({ ...initialFromData });

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
    setCard({ ...card, [target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("new card", card);
    await createCard(deckId, card);
    setCard({ ...initialFromData });
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
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <div>
        <h3>{deck.name}: Add Card</h3>
        <form name="addCard" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="front">Front</label>
            <br />
            <textarea
              id="front"
              type="text"
              name="front"
              value={card.front}
              placeholder="Front side of Card"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="back">Back</label>
            <br />
            <textarea
              id="back"
              type="text"
              name="back"
              value={card.back}
              placeholder="Back side of Card"
              onChange={handleChange}
              required
            />
          </div>
          <div className="buttonGroup">
            <button type="button" className="btn btn-secondary">
              <Link className="linkColor" to={`/decks/${deckId}`}>
                Done
              </Link>
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCard;
