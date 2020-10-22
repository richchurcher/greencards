import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import QuantitySelector from "./QuantitySelector";

test("updates quantity in store", async () => {
  const mockStore = { quantity: 0 };
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <QuantitySelector />
    </QuizContext.Provider>
  );
  const input = screen.getByRole("textbox", {
    name: /how many questions would you like?/i,
  });
  userEvent.clear(input);
  await userEvent.type(input, "5");
  expect(mockStore.quantity).toBe(5);
});
