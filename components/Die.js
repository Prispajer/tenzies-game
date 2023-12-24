import React from "react";

export default function Die({ value }) {
  return (
    <div className="game-container">
      <h3 className="dice-number">{value}</h3>
    </div>
  );
}
