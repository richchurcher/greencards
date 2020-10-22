jest.mock("./hooks/useCategories");
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { useCategories } from "./hooks/useCategories";
import { mocked } from "ts-jest/utils";

const mockedUseCategories = mocked(useCategories);

beforeEach(() => {
  mockedUseCategories.mockReturnValue({
    categories: [
      {
        id: 9,
        name: "General Knowledge",
      },
      {
        id: 10,
        name: "Entertainment: Books",
      },
    ],
    error: undefined,
    loading: false,
  });
});

test("Category selector is rendered", () => {
  render(<App />);
  const selector = screen.getByRole("combobox", {
    name: /choose a trivia category/i,
  });
  expect(selector).toBeInTheDocument();
});

test("Difficulty selector is rendered", () => {
  render(<App />);
  const selector = screen.getByRole("combobox", {
    name: /select difficulty level/i,
  });
  expect(selector).toBeInTheDocument();
});

test("Quantity selector is rendered", () => {
  render(<App />);
  const selector = screen.getByRole("textbox", {
    name: /how many questions would you like?/i,
  });
  expect(selector).toBeInTheDocument();
});
