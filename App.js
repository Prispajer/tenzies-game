import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dices, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allDices = dices.every((dice) => dice.isHeld);
    const allDicesValue = dices.every((dice) => dice.value === dices[0].value);

    if (allDices && allDicesValue) {
      setTenzies(true);
    }
  }, [dices]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(createNewDice());
    }
    return newDice;
  }

  function createNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function resetGame() {
    setDice(allNewDice());
  }

  function newRoll() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((dice) => (dice.isHeld ? dice : createNewDice()))
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const diceElements = dices.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="dice-header">
        <h1>Tenzies</h1>
        <h3>
          Roll until all dice are the same. Click each one die to freeze it at
          its current value between rolls
        </h3>
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={newRoll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
