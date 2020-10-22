import { render, screen } from "@testing-library/react";
import { observable } from "mobx";
import React from "react";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import { QuestionType } from "../store/question";
import Question from "./Question";

const question: QuestionType = {
  category: "Entertainment: Video Games",
  type: "multiple",
  difficulty: "easy",
  question:
    // Which of these is NOT a game under the Worms series?
    "V2hpY2ggb2YgdGhlc2UgaXMgTk9UIGEgZ2FtZSB1bmRlciB0aGUgV29ybXMgc2VyaWVzPw==",
  correct_answer: "TWFqb3IgTWFsZnVuY3Rpb24=", // Major Malfunction
  incorrect_answers: [
    "Q3JhenkgR29sZg==", // Crazy Golf
    "Q2xhbiBXYXJz", // Clan Wars
    "VWx0aW1hdGUgTWF5aGVt", // Ultimate Mayhem
  ],
};
const mockStore = {
  currentQuestion: 0,
  question,
  questions: observable<QuestionType>([question]),
  randomisedAnswers: [question.correct_answer, ...question.incorrect_answers],
};

test("shows utf8 question from base64 source", async () => {
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <Question />
    </QuizContext.Provider>
  );
  expect(
    screen.getByText("Which of these is NOT a game under the Worms series?")
  ).toBeInTheDocument();
});

test("shows utf8 answers from base64 source", async () => {
  render(
    <QuizContext.Provider value={mockStore as QuizStore}>
      <Question />
    </QuizContext.Provider>
  );
  expect(screen.getByText("Major Malfunction")).toBeInTheDocument();
  expect(screen.getByText("Crazy Golf")).toBeInTheDocument();
  expect(screen.getByText("Clan Wars")).toBeInTheDocument();
  expect(screen.getByText("Ultimate Mayhem")).toBeInTheDocument();
});
