import React, { createContext, FC, useState } from "react";
import quizStore, { QuizStore } from "./quiz";

export const QuizContext = createContext<QuizStore | undefined>(undefined);

const QuizProvider: FC = ({ children }) => {
  const [questionStore] = useState<QuizStore>(quizStore);

  return (
    <QuizContext.Provider value={questionStore}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
