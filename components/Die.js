import React from "react";

export default function Die(props) {
  return (
    <div className="game-container">
      <h3 className="dice-number">{props.value}</h3>
    </div>
  );
}
