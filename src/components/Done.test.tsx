import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { observable } from "mobx";
import React from "react";
import { Question } from "../store/question";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import Done from "../components/Done";

test("reset button updates store values correctly and stops the quiz", async () => {
  const expectedStore = {
    categoryId: 0,
    currentQuestion: 0,
    error: undefined,
    loading: false,
    ready: false,
    score: 0,
  };
  const mockStore = {
    categoryId: 99,
    currentQuestion: 2,
    quantity: 1,
    questions: observable<Question>([
      {
        category: "Entertainment: Video Games",
        type: "multiple",
        difficulty: "easy",
        question: "Which of these is NOT a game under the Worms series?",
        correct_answer: "Major Malfunction",
        incorrect_answers: ["Crazy Golf", "Clan Wars", "Ultimate Mayhem"],
      },
    ]),
    ready: true,
    score: 1,
  };
  const stop = jest.fn();
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <Done stop={stop} />
    </QuizContext.Provider>
  );
  userEvent.click(
    screen.getByRole("button", {
      name: /go again/i,
    })
  );
  expect(mockStore).toMatchObject(expectedStore);
  expect(mockStore.questions).toHaveLength(0);
  expect(stop).toHaveBeenCalled();
});
