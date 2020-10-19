import React from "react";
import { render, screen } from "@testing-library/react";
import CategorySelector from "./CategorySelector";

test("renders the correct number of options", () => {
  const categories = [
    { id: 1, name: "Wombats" },
    { id: 2, name: "Aardvarks" },
  ];
  render(<CategorySelector categories={categories} />);
  const categorySelector = screen.getByRole("combobox", {
    name: /choose a trivia category/i,
  });
  expect(categorySelector).toHaveLength(2);
});
