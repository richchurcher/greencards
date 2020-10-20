import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import CategorySelector from "./CategorySelector";

const categories = [
  { id: 1, name: "Wombats" },
  { id: 2, name: "Aardvarks" },
];

test("renders the correct number of options", () => {
  render(<CategorySelector categories={categories} />);
  const categorySelector = screen.getByRole("combobox", {
    name: /choose a trivia category/i,
  });
  expect(categorySelector).toHaveLength(2);
});

test("updates categoryId in store", () => {
  const mockStore = { categoryId: 0 };
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <CategorySelector categories={categories} />
    </QuizContext.Provider>
  );
  userEvent.selectOptions(
    screen.getByRole("combobox", { name: /choose a trivia category/i }),
    "2"
  );
  expect(mockStore.categoryId).toBe(2);
});
