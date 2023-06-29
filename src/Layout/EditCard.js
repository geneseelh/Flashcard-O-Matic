import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [initialFormData, setInitialFormData] = useState({
    front: "",
    back: "",
    id: 0,
    deckId: deckId,
  });
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  // call readDeck helper function to retrieve deck with specified deckId
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
  }, []);

  // call readCard helper function to retrieve card with specified cardId
  useEffect(() => {
    const abortController = new AbortController();

    readCard(cardId, abortController.signal)
      .then((data) => {
        setCard(data);
        // assign values to the form data so that it shows the existing info in the placeholder u want to edit
        setInitialFormData({
          front: data.front,
          back: data.back,
          id: data.id,
          deckId: data.deckId,
        });
        console.log(initialFormData);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching card:", error);
      });

    return () => {
      abortController.abort();
    };
  }, [cardId, deckId]);

  // call updateCard helper function to save the edited/updated info in the form when submit/save button is clicked
  function saveHandler(card) {
    updateCard(card)
      // when data is updated/submit is clicked, take user back to decks screen
      .then((data) => history.push(`/decks/${data.deckId}`))
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching card:", error);
      });
  }

  // CANCEL BUTTON -- when clicked send back to the specific screen for that deck
  function cancelHandler() {
    history.push(`/decks/${deckId}`);
  }

  if (isLoading) {
    return <h1>LOADINGGG...</h1>;
  }

  return (
    // breadcrumb nav bar
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
          <li className="breadcrumb-item">Edit Card {cardId} </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      {/* render the deck form with default form data and submit & cancel buttons */}
      <CardForm
        initialFormData={initialFormData}
        saveHandler={saveHandler}
        cancelHandler={cancelHandler}
      />
    </div>
  );
}

export default EditCard;
