import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import styled from "styled-components";
import { useQuiz } from "../hooks/useQuiz";

const ScoreContainer = styled.span`
  font-size: 1.2rem;
  font-style: italic;
  font-weight: bold;
`;

const Number = styled.span`
  color: ${({ theme }) => theme.accent};
`;

const Remaining = styled.span`
  margin: 0 1rem;
  color: ${({ theme }) => theme.label90};
`;

const Score: FC = () => {
  const { currentQuestion, quantity, questions, score } = useQuiz();

  return (
    <ScoreContainer>
      {questions.length > 0 && currentQuestion < quantity && (
        <Remaining>Remaining: {quantity - currentQuestion}</Remaining>
      )}
      <Number>Score: {score}</Number>
    </ScoreContainer>
  );
};

export default observer(Score);
