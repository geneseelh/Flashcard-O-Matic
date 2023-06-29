import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyDeck() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const [flipClicked, setFlipClicked] = useState(false);
  const [index, setIndex] = useState(0);
  const history = useHistory();

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
  console.log(deck);
  console.log(deck.cards);

  function flipButtonHandler() {
    setFlipClicked(!flipClicked);
  }

  function nextButtonHandler() {
    //makes sure next card also shows front side first
    setFlipClicked(false);
    //if the index of the current card is >= to the total # of cards -1 (last card in deck)
    if (index >= deck.cards.length - 1) {
      //then call the restart handler function
      restartHandler();
      //if not, then set the current index to 0 and increment by 1 card each time next is clicked
    } else {
      setIndex((index) => {
        return index + 1;
      });
    }
  }

  function restartHandler() {
    const clicked = window.confirm(
      "Restart cards? Click 'cancel' to return to the home page."
    );
    //if clicked is truthy ("ok" button is pressed on the window pop-up)
    if (clicked) {
      //set current index to zero (which will refresh the deck & show the first card again)
      setIndex(0);
      //if "cancel" is clicked instead
    } else if (!clicked) {
      //route back to the home page
      history.push("/");
    }
  }

  // TO HANDLE REQUIREMENT OF 2 OR MORE CARDS (create/add more cards first to test this):
  if (deck.cards && deck.cards.length >= 3) {
    const card = deck.cards[index];
    return (
      <div>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {" "}
              <Link to="/">
                <i class="bi bi-house-fill"></i> Home
              </Link>{" "}
            </li>
            <li className="breadcrumb-item">
              {" "}
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>{" "}
            </li>
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        {/* DECK TITLE */}
        <h1>Study: {`${deck.name}`}</h1>
        <div>
          {/* SHOW WHAT NUMBER CURRENT CARD IS OUT OF TOTAL CARDS IN THAT DECK -- maybe make it a header element??? */}
          <p>
            Card {index + 1} of {`${deck.cards.length}`}
          </p>
          {/* FLIP BUTTON AT BOTTOM OF CARD -- CARD IS DEFAULTED TO SHOW FRONT SIDE FIRST */}
          {flipClicked ? card.back : card.front}
          <button onClick={flipButtonHandler}>Flip</button>
          {/* AFTER FLIP BUTTON IS CLICKED THEN SHOW THE NEXT BUTTON */}
          {flipClicked && <button onClick={nextButtonHandler}>Next</button>}
        </div>
      </div>
    );
    // LOGIC TO SHOW MESSAGE IF THERES LESS THAN 2 CARDS:
  } else if (deck.cards) {
    return (
      <div>
        <div>{deck.name}</div>
        <p>Not enough cards</p>
        <p>
          You need at least 3 cards to study. There are {`${deck.cards.length}`}{" "}
          cards in this deck.{" "}
        </p>
        {/* BUTTON TO NAVIGATE TO THE ADD CARD SCREEN -- render in index.js */}
        <Link to={`/decks/${deckId}/cards/new`}>
          <button>Add cards</button>
        </Link>
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default StudyDeck;
