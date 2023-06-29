import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  //initialize the decks state
  const [decks, setDecks] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { deckId } = useParams();

  useEffect(() => {
    listDecks().then((data) => setDecks(data));
  }, [deleteClicked]);
  console.log(listDecks());

  //handle the delete button
  function handleDeleteButton(deckId) {
    //create modal dialogue pop-up screen with warning message
    const clicked = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    //if clicked is truthy ("ok" button is pressed)
    if (clicked) {
      deleteDeck(deckId).then(setDeleteClicked(!deleteClicked));
    }
  }

  return (
    <>
      <Link to={`/decks/new`}>
        <button>Create Deck</button>
      </Link>

      {decks.map((deck) => {
        return (
          <div key={deck.id}>
            <div>{deck.name}</div>
            <div>{`${deck.cards.length} cards`}</div>
            <div>{deck.description}</div>
            <Link to={`/decks/${deck.id}`}>
              <button>View</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button>Study</button>
            </Link>
            <button onClick={() => handleDeleteButton(deck.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}

export default Home;
