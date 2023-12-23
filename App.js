import React from "react";
import Die from "./components/Die";

export default function App() {
  const [arrayOfNumbers, setArrayOfNumbers] = React.useState(allNewDice());

  function allNewDice() {
    const arrayOfRandomNumber = [];
    for (let i = 0; i < 10; i++) {
      arrayOfRandomNumber.push(Math.ceil(Math.random() * 6));
    }
    return arrayOfRandomNumber;
  }

  const diceElements = arrayOfNumbers.map((dice) => <Die value={dice} />);

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
    </main>
  );
}
