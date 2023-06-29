import React from "react";
import Header from "./Header";
import Home from "./Home";
import StudyDeck from "./StudyDeck";
import CreateDeck from "./CreateDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import DeckScreen from "./DeckScreen";
import NotFound from "./NotFound";
import EditDeck from "./EditDeck";

import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckScreen />
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
