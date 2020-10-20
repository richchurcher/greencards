import { action, runInAction } from "mobx";
import React, { FC } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { Category } from "../store/category";

interface CategorySelectorProps {
  categories?: Category[];
}

const CategorySelector: FC<CategorySelectorProps> = ({ categories }) => {
  const quiz = useQuiz();
  if (!quiz.categoryId && categories) {
    runInAction(() => (quiz.categoryId = categories[0].id));
  }

  const setCategory = action((evt: any) => {
    quiz.categoryId = Number(evt.target.value);
  });

  return (
    <>
      <label htmlFor="triviaCategory">Choose a trivia category</label>
      <select id="triviaCategory" onChange={setCategory}>
        {categories &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default CategorySelector;
