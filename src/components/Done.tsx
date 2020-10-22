import { action } from "mobx";
import React, { FC } from "react";
import styled from "styled-components";
import { useQuiz } from "../hooks/useQuiz";
import Button from "./Button";
import ControlLabel from "./ControlLabel";

const DoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const Message = styled.div`
  background-color: ${({ theme }) => theme.lemonMeringue};
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
`;

interface DoneProps {
  stop(): void;
}

const Done: FC<DoneProps> = ({ stop }) => {
  const quiz = useQuiz();

  const resetQuiz = action(() => {
    quiz.score = 0;
    quiz.questions.replace([]);
    quiz.categoryId = 0;
    quiz.currentQuestion = 0;
    quiz.error = undefined;
    quiz.loading = false;
    quiz.ready = false;
    stop();
  });

  return (
    <DoneContainer>
      <Message>
        <ControlLabel>Results</ControlLabel>
        <p>
          You scored {quiz.score} of a possible {quiz.quantity}. Nice work!
        </p>
        <p>
          If you got most of the questions right, then "Nice work!" was
          completely sincere.
        </p>
        <p>If not, then a little gentle sarcasm is implied.</p>
      </Message>
      <Button onClick={resetQuiz}>Go again</Button>
    </DoneContainer>
  );
};

export default Done;
