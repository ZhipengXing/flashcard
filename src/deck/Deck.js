import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import DeckDetail from "./DeckDetail";
import DeckEdit from "./DeckEdit";
import DeckStudy from "./DeckStudy";
import AddCard from "../card/AddCard";
import EditCard from "../card/EditCard";
export const Deck = () => {
  const { url, path } = useRouteMatch();

  return (
    <section>
      <div>
        <Switch>
          <Route path={`${path}/study`}>
            <DeckStudy />
          </Route>
          <Route path={`${path}/edit`}>
            <DeckEdit />
          </Route>
          <Route path={`${path}/cards/new`}>
            <AddCard />
          </Route>
          <Route path={`${path}/cards/:cardId/edit`}>
            <EditCard />
          </Route>
          <Route exact path={path}>
            <DeckDetail />
          </Route>
        </Switch>
      </div>
    </section>
  );
};

export default Deck;
