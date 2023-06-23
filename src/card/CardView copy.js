import React from "react";
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";

const CardView = ({ card, setDeck }) => {
  const { path, url } = useRouteMatch();
  const { deckId } = useParams();
  const id = card.id;
  const history = useHistory();
  const handleDelete = async () => {
    const result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
      console.log(id);
      await deleteCard(id);
      const abortController = new AbortController();
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
      //how to re-render new cardlist?
    }
  };
  return (
    <article>
      <div>
        <p>{card.front}</p>
        <p>{card.back}</p>
        <button>
          <Link to={`${url}/cards/${card.id}/edit`}>Edit</Link>
        </button>
        <button name="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default CardView;
