import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckNav from "../deck/CreateDeckNav";
import DeckList from "../home/DeckList";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Deck from "../deck/Deck";
import CreateDeck from "../deck/CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/">
            <CreateDeckNav />
            <DeckList />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
