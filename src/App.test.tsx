import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Category selector is rendered", () => {
  const { getByText } = render(<App />);
  const selector = getByText(/choose a trivia category/i);
  expect(selector).toBeInTheDocument();
});

test("Difficulty selector is rendered", () => {
  const { getByText } = render(<App />);
  const selector = getByText(/select difficulty level/i);
  expect(selector).toBeInTheDocument();
});

test("Quantity selector is rendered", () => {
  const { getByText } = render(<App />);
  const selector = getByText(/how many questions would you like/i);
  expect(selector).toBeInTheDocument();
});
