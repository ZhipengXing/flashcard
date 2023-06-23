import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
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
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="buttonGroup">
          <button type="button" className="btn btn-secondary">
            {/* <Link to={`${url}/edit`}> */}
            <Link
              className="linkColor"
              to={{ pathname: `${url}/edit`, state: { deckName: deck.name } }}
            >
              <Icon.Pencil /> Edit
            </Link>
          </button>
          <button type="button" className="btn btn-primary">
            <Link to={`${url}/study`} style={{ color: "white" }}>
              <Icon.JournalBookmarkFill /> Study
            </Link>
          </button>
          <button type="button" className="btn btn-primary">
            <Link className="linkColor" to={`${url}/cards/new`}>
              <Icon.PlusLg /> Add Cards
            </Link>
          </button>
        </div>
        <button
          type="button"
          className="btn btn-danger trash"
          onClick={handleDelete}
        >
          <Icon.Trash3 />
        </button>
      </div>
      <div>
        <CardList deck={deck} />
      </div>
    </section>
  );
};

export default DeckDetail;
