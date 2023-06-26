import React from "react";
import { Link } from "react-router-dom";

export const CardForm = ({ card, deckId, handleChange, handleSubmit }) => {
  //   console.log("card", card.id);
  if (card.id) {
    return (
      <form name="editCard" onSubmit={handleSubmit}>
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
      </form>
    );
  }
  return (
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
  );
};

export default CardForm;
