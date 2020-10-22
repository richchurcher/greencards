import { action, runInAction } from "mobx";
import React, { FC } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { Category } from "../store/category";
import ControlLabel from "./ControlLabel";
import Select from "./Select";

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
      <ControlLabel htmlFor="triviaCategory">
        Choose a trivia category:
      </ControlLabel>
      <Select id="triviaCategory" onChange={setCategory}>
        {categories &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </Select>
    </>
  );
};

export default CategorySelector;
