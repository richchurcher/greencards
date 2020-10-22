import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import Answer from "./Answer";

const resetStore = () => ({
  currentQuestion: 0,
  question: {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "Which of these is NOT a game under the Worms series?",
    correct_answer: "TWFqb3IgTWFsZnVuY3Rpb24=", // Major Malfunction
    incorrect_answers: [
      "Q3JhenkgR29sZg==", // Crazy Golf
      "Q2xhbiBXYXJz", // Clan Wars
      "VWx0aW1hdGUgTWF5aGVt", // Ultimate Mayhem
    ],
  },
  score: 0,
});

test("clicking correct answer updates score and reveals answers", async () => {
  const mockStore = resetStore();
  const answer = mockStore.question.correct_answer;
  let reveal = false;
  const setReveal = (val: boolean) => (reveal = val);
  const { rerender } = render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <Answer answer={answer} reveal={reveal} setReveal={setReveal} />
    </QuizContext.Provider>
  );
  userEvent.click(screen.getByText(Buffer.from(answer, "base64").toString()));
  expect(mockStore.score).toBe(1);
  rerender(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <Answer answer={answer} reveal={reveal} setReveal={setReveal} />
    </QuizContext.Provider>
  );
  expect(screen.getByText("✓")).toBeInTheDocument();
});

test("clicking incorrect answer does not update score, but reveals answers anyway", async () => {
  const mockStore = resetStore();
  const answer = mockStore.question.incorrect_answers[0];
  let reveal = false;
  const setReveal = (val: boolean) => (reveal = val);
  const { rerender } = render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <Answer answer={answer} reveal={reveal} setReveal={setReveal} />
    </QuizContext.Provider>
  );
  userEvent.click(screen.getByText(Buffer.from(answer, "base64").toString()));
  expect(mockStore.score).toBe(0);
  rerender(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <Answer answer={answer} reveal={reveal} setReveal={setReveal} />
    </QuizContext.Provider>
  );
  expect(screen.getByText("✗")).toBeInTheDocument();
});
