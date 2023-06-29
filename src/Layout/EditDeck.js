import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [initialFormData, setInitialFormData] = useState({
    name: "",
    description: "",
    id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

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
  }, []);

  // assign values to the form data so that it shows the existing info in the placeholder u want to edit
  useEffect(() => {
    const initialFormData = {
      name: deck.name,
      description: deck.description,
      id: deck.id,
    };
    setInitialFormData(initialFormData);
    console.log(initialFormData);
    // useEffect will run every time the state of the deck changes
  }, [deck]);

  // call updateDeck helper function to save the edited/updated info in the form when submit button is clicked
  function submitHandler(deck) {
    updateDeck(deck)
      // when data is updated/submit is clicked, take user back to decks screen
      .then((data) => history.push(`/decks/${data.id}`))
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching deck:", error);
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
    // BREADCRUMB NAV BAR -- BOOTSTRAP
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
          <li className="breadcrumb-item">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      {/* render the deck form with default form data and submit & cancel buttons */}
      <DeckForm
        initialFormData={initialFormData}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </div>
  );
}

export default EditDeck;
