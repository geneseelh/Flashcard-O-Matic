import React, { useState } from "react";
import { Route, useParams, Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const initialFormData = { name: "", description: "" };

  // SUBMIT BUTTON
  function submitHandler(deck) {
    //call the createDeck helper function
    createDeck(deck)
      .then((data) => history.push(`/decks/${data.id}`))
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching deck:", error);
      });
  }

  // CANCEL BUTTON
  function cancelHandler() {
    history.push("/");
  }

  return (
    // DO BREADCRUMB NAV BAR IN BOOTSTRAP INSTEAD -- link to home / "Create Deck" before the header
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {" "}
            <Link to="/">
              <i class="bi bi-house-fill"></i> Home{" "}
            </Link>{" "}
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>

      {/* render the deck form & pass in the submit & cancel buttons and default formdata as props */}
      <DeckForm
        submitHandler={submitHandler}
        initialFormData={initialFormData}
        cancelHandler={cancelHandler}
      />
    </div>
  );
}

export default CreateDeck;
