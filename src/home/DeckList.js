import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeckView from "./DeckView";
import { listDecks, deleteDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const abortController = new AbortController();
  useEffect(() => {
    listDecks(abortController.signal)
      .then(setDecks)
      .then(() => setLoading(false))
      .catch(setError);
    return () => abortController.abort();
  }, []);
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  const deleteDeckonMain = async (deckId) => {
    const result = window.confirm(
      "Delete this deck?" + "\n" + "\n" + "You will not be able to recover it."
    );
    if (result) {
      console.log("index to delete");
      await deleteDeck(deckId);
      // await listDecks(abortController.signal).then(setDecks).catch(setError);
      setDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== deckId)
      );
      //avoid another API call
    }
  };

  const list = decks.map((deck, index) => (
    // pass in ID instead of index. ID is always unique.

    // <DeckView
    //   key={deck.id}
    //   deck={deck}

    // />

    <DeckView
      key={deck.id}
      deck={deck}
      deleteDeck={() => deleteDeckonMain(deck.id)}
    />
  ));
  // console.log("see", decks[0]);
  return (
    <main>
      <section>{list}</section>
    </main>
  );
};

export default DeckList;
