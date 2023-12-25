import React from "react";

export default function Die({ value, isHeld }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <div className="game-container" style={styles}>
      <h3 className="dice-number">{value}</h3>
    </div>
  );
}
