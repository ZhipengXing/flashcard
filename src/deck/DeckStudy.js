import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardFlip from "../card/CardFlip";
import ErrorMessage from "../Layout/ErrorMessage";
import * as Icon from "react-bootstrap-icons";
export const DeckStudy = () => {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { deckId } = useParams();
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
  const cards = deck.cards;
  const totalCards = deck.cards.length;

  if (totalCards < 3) {
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
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h3>{deck.name}: Study</h3>
          <h4>Not enough cards.</h4>
          <p>
            You need at least 3 cards to study. There are {totalCards} cards in
            this deck.
          </p>
          <button type="button" className="btn btn-primary">
            <Link className="linkColor" to={`/decks/${deckId}/cards/new`}>
              <Icon.PlusLg /> Add Cards
            </Link>
          </button>
        </div>
      </section>
    );
  }
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
            Study
          </li>
        </ol>
      </nav>
      <div>
        <h3>{deck.name}: Study</h3>
        <CardFlip cards={cards} />
      </div>
    </section>
  );
};

export default DeckStudy;
