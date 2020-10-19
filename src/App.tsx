import React, { FC } from "react";
import CategorySelector from "./components/CategorySelector";
import Loading from "./components/Loading";
import { useCategories } from "./hooks/useCategories";

const App: FC = () => {
  const { error, loading, categories } = useCategories();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <CategorySelector categories={categories} />
      <label htmlFor="questionQuantity">
        How many questions would you like?
      </label>
      <input type="number" id="questionQuantity" />
      <label htmlFor="questionDifficulty">Select difficulty level</label>
      <select id="questionDifficulty" />
    </>
  );
};

export default App;
