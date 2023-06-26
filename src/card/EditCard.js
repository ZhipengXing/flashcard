import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";
import ErrorMessage from "../Layout/ErrorMessage";
import * as Icon from "react-bootstrap-icons";
export const EditCard = () => {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .then(() => setLoading(false))
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then(setCard)
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
    await updateCard(card);
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
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <div>
        <h3>Edit Card</h3>
        {/* <form name="editCard" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="front">Front</label>
            <br />
            <textarea
              id="front"
              type="text"
              name="front"
              defaultValue={card.front}
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
              defaultValue={card.back}
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
        </form> */}
        <CardForm
          card={card}
          deckId={deckId}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default EditCard;
