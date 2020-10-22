import { action } from "mobx";
import React, { FC } from "react";
import styled from "styled-components";
import { useQuiz } from "../hooks/useQuiz";
import { fromBase64 } from "../store/quiz";
import AnswerIndicator from "./AnswerIndicator";

const AnswerCard = styled.div`
  min-height: 4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.darkSeaGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.5rem;
  border-radius: 1rem;
  margin: 1rem;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
`;

interface AnswerProps {
  answer: string;
  reveal: boolean;
  setReveal(x: boolean): void;
}

const Answer: FC<AnswerProps> = ({ answer, reveal, setReveal }) => {
  const quiz = useQuiz();

  const answerQuestion = action((answer: string) => {
    if (answer === quiz.question.correct_answer) {
      quiz.score += 1;
    }
    setReveal(true);
  });

  return (
    <AnswerCard onClick={() => answerQuestion(answer)}>
      {reveal && <AnswerIndicator answer={answer} />}
      {fromBase64(answer)}
    </AnswerCard>
  );
};

export default Answer;
