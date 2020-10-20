import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import QuantitySelector from "./QuantitySelector";

test("updates quantity in store", () => {
  const mockStore = { quantity: 0 };
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <QuantitySelector />
    </QuizContext.Provider>
  );
  userEvent.type(
    screen.getByRole("spinbutton", {
      name: /how many questions would you like?/i,
    }),
    "5"
  );
  expect(mockStore.quantity).toBe(5);
});

test("does not update for values less than 1", () => {
  const mockStore = { quantity: 1 };
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <QuantitySelector />
    </QuizContext.Provider>
  );
  userEvent.type(
    screen.getByRole("spinbutton", {
      name: /how many questions would you like?/i,
    }),
    "0"
  );
  expect(mockStore.quantity).toBe(1);
});
