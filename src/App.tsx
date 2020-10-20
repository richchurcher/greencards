import React, { FC, useState } from "react";
import CategorySelector from "./components/CategorySelector";
import DifficultySelector from "./components/DifficultySelector";
import Error from "./components/Error";
import Loading from "./components/Loading";
import QuantitySelector from "./components/QuantitySelector";
import Quiz from "./components/Quiz";
import { useCategories } from "./hooks/useCategories";
import QuizProvider from "./store/QuizProvider";

const App: FC = () => {
  const { error, loading, categories } = useCategories();
  const [quizVisible, setQuizVisible] = useState(false);

  if (error) {
    return <Error>{error}</Error>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <QuizProvider>
      <CategorySelector categories={categories} />
      <QuantitySelector />
      <DifficultySelector />
      {quizVisible ? (
        <Quiz />
      ) : (
        <button onClick={() => setQuizVisible(true)}>Start</button>
      )}
    </QuizProvider>
  );
};

export default App;
