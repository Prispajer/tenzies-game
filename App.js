import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dices, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [roll, setRoll] = React.useState(localStorage.getItem("rollTime") || 0);
  const [time, setTime] = React.useState(localStorage.getItem("playTime") || 0);
  const [bestTime, setBestTime] = React.useState(
    localStorage.getItem("bestTime") || 0
  );

  React.useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);

  React.useEffect(() => {
    const allDices = dices.every((dice) => dice.isHeld);
    const allDicesValue = dices.every((dice) => dice.value === dices[0].value);

    if (allDices && allDicesValue) {
      setTenzies(true);
    }
  }, [dices]);

  React.useEffect(() => {
    let interval;
    if (!tenzies) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let currentTime = prevTime + 1;
          localStorage.setItem("playTime", currentTime);

          if (!bestTime || currentTime < bestTime) {
            localStorage.setItem("bestTime", currentTime);
          } else {
            localStorage.setItem("bestTime", bestTime);
          }
          return currentTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [tenzies, bestTime]);

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
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((dice) => (dice.isHeld ? dice : createNewDice()))
      );
      setRoll((prevRoll) => {
        localStorage.setItem("rollTime", prevRoll + 1);
        return prevRoll + 1;
      });
    } else {
      setBestTime(localStorage.getItem("bestTime"));
      setDice(allNewDice());
      setTenzies(false);
      setTime(0);
      setRoll(0);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.id === id
          ? Object.assign({}, dice, { isHeld: !dice.isHeld })
          : dice;
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
      <h4>{`Elapsed time: ${time}`}</h4>
      <h4>{`Number of rolls: ${roll}`} </h4>
      <h4>{`Best time : ${bestTime}`}</h4>
    </main>
  );
}
