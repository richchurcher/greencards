import { useContext } from "react";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";

export const useQuiz = (): QuizStore => {
  const store = useContext(QuizContext);
  if (!store) {
    throw Error("<QuizProvider> isn't providing a valid store.");
  }

  return store;
};
