import React, { FC } from "react";
import styled from "styled-components";
import { Category } from "../store/category";
import Button from "./Button";
import CategorySelector from "./CategorySelector";
import DifficultySelector from "./DifficultySelector";
import QuantitySelector from "./QuantitySelector";

interface QuizControlsProps {
  categories?: Category[];
  start(): void;
}

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuizControls: FC<QuizControlsProps> = ({ categories, start }) => {
  return (
    <ControlsContainer>
      <CategorySelector categories={categories} />
      <QuantitySelector />
      <DifficultySelector />
      <Button onClick={start}>Start</Button>
    </ControlsContainer>
  );
};

export default QuizControls;
