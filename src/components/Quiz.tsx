import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { useQuestions } from "../hooks/useQuestions";
import { useQuiz } from "../hooks/useQuiz";
import Done from "./Done";
import Error from "./Error";
import Loading from "./Loading";
import Question from "./Question";

interface QuizProps {
  stop(): void;
}

const Quiz: FC<QuizProps> = ({ stop }) => {
  useQuestions();
  const { currentQuestion, error, loading, questions } = useQuiz();

  if (error) {
    return <Error>{error.message}</Error>;
  }

  if (loading) {
    return <Loading />;
  }

  return currentQuestion < questions.length ? (
    <Question />
  ) : (
    <Done stop={stop} />
  );
};

export default observer(Quiz);
