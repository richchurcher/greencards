import { action } from "mobx";
import React, { FC } from "react";
import config from "../config";
import { useQuiz } from "../hooks/useQuiz";

const QuantitySelector: FC = () => {
  const quiz = useQuiz();

  const setQuantity = action((evt: any) => {
    if (evt.target.value < 1) {
      return;
    }
    quiz.quantity = Number(evt.target.value);
  });

  return (
    <>
      <label htmlFor="questionQuantity">
        How many questions would you like?
      </label>
      <input
        type="number"
        id="questionQuantity"
        onChange={setQuantity}
        defaultValue={quiz.quantity}
        min={1}
        max={config.maxQuestions}
      />
    </>
  );
};

export default QuantitySelector;
