import React from "react";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false });
    }
    return newDice;
  }

  function newRoll() {
    const newDice = allNewDice();
    setDice(newDice);
  }

  const diceElements = dice.map((die) => <Die value={die.value} />);

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button onClick={newRoll}>Roll</button>
    </main>
  );
}
