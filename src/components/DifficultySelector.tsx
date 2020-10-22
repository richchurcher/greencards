import { action } from "mobx";
import React, { FC } from "react";
import { useQuiz } from "../hooks/useQuiz";
import ControlLabel from "./ControlLabel";
import Select from "./Select";

const DifficultySelector: FC = () => {
  const quiz = useQuiz();

  const setDifficultyLevel = action((evt: any) => {
    quiz.difficulty = evt.target.value;
  });

  return (
    <>
      <ControlLabel htmlFor="difficulty">Select difficulty level:</ControlLabel>
      <Select id="difficulty" onChange={setDifficultyLevel}>
        <option key="easy" value="easy">
          Easy
        </option>
        <option key="medium" value="medium">
          Medium
        </option>
        <option key="hard" value="hard">
          Hard
        </option>
      </Select>
    </>
  );
};

export default DifficultySelector;
