import React, { useState } from "react";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import CardView from "./CardView";
import { deleteCard } from "../utils/api";
export const CardList = ({ deck }) => {
  const { path } = useRouteMatch();
  console.log(path);

  const [cards, setCards] = useState(deck.cards);
  console.log("cards", cards);
  const deleteCardOnDeck = async (cardId) => {
    const result = window.confirm(
      "Delete this card?" + "\n" + "\n" + "You will not be able to recover it."
    );
    if (result) {
      await deleteCard(cardId);

      setCards((currentCards) =>
        currentCards.filter((card) => card.id !== cardId)
      );
      //avoid making another API call
    }
  };

  const cardList = cards.map((card) => (
    <CardView
      key={card.id}
      card={card}
      deleteCard={() => deleteCardOnDeck(card.id)}
    />
  ));
  return (
    <main>
      <h3>Cards</h3>

      <div>{cardList}</div>
    </main>
  );
};

export default CardList;

// const deleteCard=(id of the card) 1. delete the card from database and 2. delete the card from the state
// pass this deleteCard down to cardview
//in cardview, can now remove delete card
