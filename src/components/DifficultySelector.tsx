import { action } from "mobx";
import React, { FC } from "react";
import { useQuiz } from "../hooks/useQuiz";

const DifficultySelector: FC = () => {
  const quiz = useQuiz();

  const setDifficultyLevel = action((evt: any) => {
    quiz.difficulty = evt.target.value;
  });

  return (
    <>
      <label htmlFor="difficulty">Select difficulty level</label>
      <select id="difficulty" onChange={setDifficultyLevel}>
        <option key="easy" value="easy">
          Easy
        </option>
        <option key="medium" value="medium">
          Medium
        </option>
        <option key="hard" value="hard">
          Hard
        </option>
      </select>
    </>
  );
};

export default DifficultySelector;
