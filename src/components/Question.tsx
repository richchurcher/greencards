import { action } from "mobx";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { useQuiz } from "../hooks/useQuiz";
import { fromBase64 } from "../store/quiz";
import Answer from "./Answer";
import Button from "./Button";

const QuestionTitle = styled.h1`
  font-size: 1.1rem;
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Question: FC = () => {
  const [reveal, setReveal] = useState(false);
  const quiz = useQuiz();

  const advanceQuiz = action(() => {
    setReveal(false);
    quiz.currentQuestion += 1;
  });

  const nextButtonLabel =
    quiz.currentQuestion === quiz.questions.length - 1
      ? "Finish"
      : "Next Question";

  return (
    <QuestionContainer>
      <QuestionTitle>{fromBase64(quiz.question.question)}</QuestionTitle>
      {quiz.randomisedAnswers.map((ans) => (
        <Answer key={ans} answer={ans} reveal={reveal} setReveal={setReveal} />
      ))}
      {reveal && <Button onClick={advanceQuiz}>{nextButtonLabel}</Button>}
    </QuestionContainer>
  );
};

export default observer(Question);
