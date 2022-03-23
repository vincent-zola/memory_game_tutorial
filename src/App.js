import React, { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

// key in string makes here no difference but you should use string if your keys contain white-spaces or numbers mixed with letters
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    // duplicate our existing images
    const shuffledCards = [...cardImages, ...cardImages]
      // sort works by comparing two num with each other, so we use Math.random to assign to each img either a plus or minus value, which getting compared and we get a random order this way
      .sort(() => Math.random() - 0.5)
      // add id key to each card
      .map((card) => ({ ...card, id: Math.random() }));
    // is needed because the player can have cards selected if he presses New Game
    setChoiceOne(null);
    setChoiceTwo(null);
    // update the state to 12 random cards
    setCards(shuffledCards);
    // when we restart game turns will be set to 0 again
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // handleChoice will update at a scheduled time therefore we need to use useEffect
  // compare 2 selected cards
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // change matched from false to true
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
    // ALL dependencies should be included
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            // this will be true or false based on 3 conditions
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
