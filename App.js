import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dices, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allDices = dices.every((dice) => dice.isHeld);
    const allDicesValue = dices.every((dice) => dice.value === dices[0].value);

    if (allDices && allDicesValue) {
      setTenzies(true);
      console.log("YOU WON!");
    } else {
      setTenzies(false);
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

  function newRoll() {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.isHeld ? dice : createNewDice();
      })
    );
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
      <div className="dice-header">
        <h1>Tenzies</h1>
        <h3>
          Roll until all dice are the same. Click each one die to freeze it at
          its current value between rolls
        </h3>
      </div>
      <div className="dice-container">{diceElements}</div>
      <button onClick={newRoll}>Roll</button>
    </main>
  );
}
