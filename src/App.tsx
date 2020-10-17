import React from "react";

function App() {
  return (
    <>
      <label htmlFor="questionCategory">Choose a trivia category</label>
      <select name="questionCategory" />
      <label htmlFor="questionQuantity">
        How many questions would you like?
      </label>
      <input type="number" name="questionQuantity" />
      <label htmlFor="questionDifficulty">Select difficulty level</label>
      <select name="questionDifficulty" />
    </>
  );
}

export default App;
