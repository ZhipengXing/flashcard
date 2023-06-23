import React from "react";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import CardView from "./CardView";
export const CardList = ({ cards, setDeck }) => {
  const { path } = useRouteMatch();
  console.log(path);
  console.log("cards", cards);

  const cardList = cards.map((card, index) => (
    <CardView key={card.id} card={card} setDeck={setDeck} />
  ));
  return (
    <main>
      <h3>Cards</h3>

      <h3>{cardList}</h3>
    </main>
  );
};

export default CardList;

// const deleteCard=(id of the card) 1. delete the card from database and 2. delete the card from the state
// pass this deleteCard down to cardview
//in cardview, can now remove delete card
