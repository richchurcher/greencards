import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { useQuestions } from "../hooks/useQuestions";
import { useQuiz } from "../hooks/useQuiz";
import Error from "./Error";
import Loading from "./Loading";

const Quiz: FC = () => {
  const {
    categoryId,
    difficulty,
    error,
    quantity,
    questions,
    ready,
  } = useQuiz();
  useQuestions(categoryId, difficulty, quantity);

  if (!ready) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {error && <Error>{error.message}</Error>}
      QUIZ: {JSON.stringify(questions, null, 2)}
    </div>
  );
};

export default observer(Quiz);
