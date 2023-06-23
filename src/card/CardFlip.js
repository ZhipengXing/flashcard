import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const CardFlip = ({ cards }) => {
  const firstCard = cards[0];
  const [currentCard, setCurrentCard] = useState(firstCard);
  const [currentCardNo, setCurrentCardNo] = useState(0);
  const [flip, setFlip] = useState(true);
  const totalCards = cards.length;
  const history = useHistory();
  console.log("card number", currentCardNo);
  const handleFlip = () => {
    setFlip(() => !flip);
  };
  const handleNext = () => {
    if (currentCardNo === totalCards - 1) {
      const result = window.confirm(
        "Restart cards?" +
          "\n" +
          "\n" +
          "Click 'cancel' to return to the home page"
      );
      if (!result) {
        history.push("/");
      }
      setCurrentCardNo(() => 0);
      setCurrentCard(() => firstCard);
      setFlip(() => !flip);
    } else {
      setCurrentCardNo(() => currentCardNo + 1);
      setCurrentCard(() => cards[currentCardNo + 1]);
      setFlip(() => !flip);
    }
  };

  if (flip) {
    return (
      <article className="card">
        <div className="border card-body">
          <h4>
            Card {currentCardNo + 1} of {totalCards}
          </h4>
          <p>{currentCard.front}</p>
          <button
            onClick={handleFlip}
            type="button"
            className="btn btn-secondary"
          >
            Flip
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <div className="border card-body">
        <h4>
          Card {currentCardNo + 1} of {totalCards}
        </h4>
        <p>{currentCard.back}</p>
        <div className="buttonGroup">
          <button
            onClick={handleFlip}
            type="button"
            className="btn btn-secondary"
          >
            Flip
          </button>
          <button
            onClick={handleNext}
            type="button"
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardFlip;
