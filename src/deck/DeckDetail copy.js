import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import CardList from "../card/CardList";

export const DeckDetail = () => {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { deckId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();

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
  console.log(deckId);

  const handleDelete = async () => {
    const result = window.confirm(
      "Delete this deck?" + "\n" + "\n" + "You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };
  console.log("deck.cards", deck.cards);
  return (
    <section>
      <h3>Add breadcrumb here </h3>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <button>
          <Link to={`${url}/edit`}>Edit</Link>
        </button>
        <button>
          <Link to={`${url}/study`}>Study</Link>
        </button>
        <button>
          <Link to={`${url}/cards/new`}>Add Cards</Link>
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>
        <CardList cards={deck.cards} setDeck={setDeck} />
      </div>
    </section>
  );
};

export default DeckDetail;
