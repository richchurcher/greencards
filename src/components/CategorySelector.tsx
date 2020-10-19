import React, { FC } from "react";
import { Category } from "../store/category";

interface CategorySelectorProps {
  categories?: Category[];
}

const CategorySelector: FC<CategorySelectorProps> = ({ categories }) => (
  <>
    <label htmlFor="triviaCategory">Choose a trivia category</label>
    <select id="triviaCategory">
      {categories &&
        categories.map((cat) => <option key={cat.id}>{cat.name}</option>)}
    </select>
  </>
);

export default CategorySelector;
