import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import DifficultySelector from "./DifficultySelector";

test("updates difficulty in store", () => {
  const mockStore = { difficulty: "easy" };
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <DifficultySelector />
    </QuizContext.Provider>
  );
  userEvent.selectOptions(
    screen.getByRole("combobox", {
      name: /select difficulty level/i,
    }),
    "hard"
  );
  expect(mockStore.difficulty).toBe("hard");
});
