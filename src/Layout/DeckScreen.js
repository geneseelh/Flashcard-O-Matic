import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function DeckScreen() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const [deleteClicked, setDeleteClicked] = useState(false);
  const history = useHistory();

  // call readDeck function to display the deck with the matching deckId
  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((data) => setDeck(data))
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching deck:", error);
      });

    return () => {
      abortController.abort();
    };
    // when state of delete button changes, re-render the page to update the deck
  }, [deleteClicked]);

  // DELETE DECK BUTTON
  function handleDeleteDeckButton() {
    //create modal dialogue pop-up screen with warning message
    const clicked = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    //if clicked is truthy ("ok" button is pressed)
    if (clicked) {
      deleteDeck(deck.id);
      history.push("/");
    }
  }

  // DELETE CARD BUTTON
  function handleDeleteCardButton(cardId) {
    //create modal dialogue pop-up screen with warning message
    const clicked = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    //if clicked is truthy ("ok" button is pressed)
    if (clicked) {
      deleteCard(cardId).then(setDeleteClicked(!deleteClicked));
    }
  }

  // DO BREADCRUMB NAV BAR IN BOOTSTRAP INSTEAD -- link to home / "Create Deck" before the header
  if (deck.cards) {
    return (
      <div>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {" "}
              <Link to="/">
                {" "}
                <i className="bi bi-house-fill"></i> Home
              </Link>{" "}
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>
        <div>
          {/* DECK TITLE */}
          <h1>{`${deck.name}`}</h1>
          <p>{`${deck.description}`}</p>
          {/* DECK BUTTONS */}
          <Link to={`/decks/${deckId}/edit`}>
            <button>Edit</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button>Study</button>
          </Link>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button>Add Cards</button>
          </Link>
          <button onClick={handleDeleteDeckButton}>Delete</button>
        </div>
        <div>
          <h2>Cards</h2>
          {/* map thru the cards in the deck to display front and back of each card */}
          {deck.cards.map((card, index) => {
            return (
              <div key={index}>
                <div>{card.front}</div>
                <div>{card.back}</div>
                {/* CARD BUTTONS */}
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteCardButton(card.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default DeckScreen;
