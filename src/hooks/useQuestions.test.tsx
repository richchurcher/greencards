jest.mock("axios");
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { observable, when } from "mobx";
import React, { FC } from "react";
import { mocked } from "ts-jest/utils";
import config from "../config";
import { Question } from "../store/question";
import { QuizStore } from "../store/quiz";
import { QuizContext } from "../store/QuizProvider";
import { useQuestions } from "./useQuestions";

const mockedAxios = mocked(axios, true);
const useQuestionsMock = {
  data: {
    results: [
      {
        category: "Entertainment: Video Games",
        type: "multiple",
        difficulty: "easy",
        question: "Which of these is NOT a game under the Worms series?",
        correct_answer: "Major Malfunction",
        incorrect_answers: ["Crazy Golf", "Clan Wars", "Ultimate Mayhem"],
      },
      {
        category: "Entertainment: Video Games",
        type: "multiple",
        difficulty: "easy",
        question: "What ingredients are required to make a cake in Minecraft?",
        correct_answer: "Milk, Sugar, Egg, and Wheat",
        incorrect_answers: [
          "Milk, Bread, Egg, and Wheat",
          "Milk, Sugar Cane, Egg, and Wheat",
          "Milk, Sugar, and Wheat",
        ],
      },
    ],
  },
};

const hookWrapper = (mockStore: any): FC => ({ children }) => {
  return (
    <QuizContext.Provider value={mockStore as QuizStore}>
      {children}
    </QuizContext.Provider>
  );
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(useQuestionsMock);
});

test("sets loading to true", async () => {
  const mockStore = observable({
    loading: false,
  });

  renderHook(() => useQuestions(), { wrapper: hookWrapper(mockStore) });
  // TODO: rather self-evident! But sets up the pattern.
  when(
    () => mockStore.loading,
    () => expect(mockStore.loading).toBe(true)
  );
});

test("sets error if categoryId 0", async () => {
  const mockStore = observable({
    error: undefined,
  });
  renderHook(() => useQuestions(), { wrapper: hookWrapper(mockStore) });
  when(
    () => !!mockStore.error,
    () =>
      expect(mockStore.error).toMatchInlineSnapshot(
        `[Error: No category provided.]`
      )
  );
});

test("sets error if quantity < 1", async () => {
  const mockStore = observable({
    categoryId: 1,
    error: undefined,
    quantity: 0,
  });
  renderHook(() => useQuestions(), { wrapper: hookWrapper(mockStore) });
  when(
    () => !!mockStore.error,
    () =>
      expect(mockStore.error).toMatchInlineSnapshot(
        `[Error: Have to answer at least one question.]`
      )
  );
});

test("sets error if quantity greater than maxQuestions", async () => {
  const mockStore = observable({
    categoryId: 1,
    error: undefined,
    quantity: config.maxQuestions + 1,
  });
  renderHook(() => useQuestions(), {
    wrapper: hookWrapper(mockStore),
  });
  when(
    () => !!mockStore.error,
    () =>
      expect(mockStore.error).toMatchInlineSnapshot(
        "[Error: Sorry, you can only have 10 in a quiz.]"
      )
  );
});

test("sets an array of questions", async () => {
  const mockStore = observable({
    categoryId: 1,
    quantity: config.maxQuestions + 1,
    questions: observable<Question>([]),
  });
  renderHook(() => useQuestions(), {
    wrapper: hookWrapper(mockStore),
  });
  when(
    () => !!mockStore.questions.length,
    () =>
      expect(mockStore.questions).toHaveLength(
        useQuestionsMock.data.results.length
      )
  );
});
