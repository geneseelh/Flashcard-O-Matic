import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  //   const [card, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveClicked, setSaveClicked] = useState(false);
  const history = useHistory();
  const initialFormData = { front: "", back: "" };

  // call readDeck helper function to retrieve deck with specified deckId
  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((data) => setDeck(data))
      .then(() => setIsLoading(false))
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching deck:", error);
      });

    return () => {
      abortController.abort();
    };
  }, [saveClicked]);

  // SAVE BUTTON -- when clicked creates new card and associates it with relevant deck
  function saveHandler(card) {
    createCard(deckId, card)
      //append newly created card (data) to cards array in deck object
      .then((data) => {
        setDeck((prevDeck) => ({
          ...prevDeck,
          cards: [...prevDeck.cards, data],
        }));
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching deck:", error);
      });
  }

  // CANCEL BUTTON -- when clicked send back to the specific screen for that deck
  function doneHandler() {
    history.push(`/decks/${deckId}`);
  }

  if (isLoading) {
    return <h1>LOADINGGG...</h1>;
  }

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {" "}
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="breadcrumb-item">
            {" "}
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>{" "}
          </li>
          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>
      {/* DECK TITLE */}
      <div>
        <h1>{`${deck.name}`}</h1>
        <p>Add Card</p>
      </div>
      {/* render the deck form with default form data and submit & cancel buttons */}
      <CardForm
        initialFormData={initialFormData}
        saveHandler={saveHandler}
        cancelHandler={doneHandler}
      />
    </div>
  );
}

export default AddCard;
