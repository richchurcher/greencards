import { renderHook } from "@testing-library/react-hooks";
import { useQuestions } from "./useQuestions";
import axios from "axios";
import config from "../config";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const useQuestionsMock = {
  data: {
    result: [
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

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(useQuestionsMock);
});

test("errors if no topic provided", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuestions("", "easy", 1)
  );
  await waitForNextUpdate();
  expect(result.current.error).toMatchInlineSnapshot(
    "[Error: No topic provided.]"
  );
});

test("errors if quantity less than 1", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuestions("Music", "easy", 0)
  );
  await waitForNextUpdate();
  expect(result.current.error).toMatchInlineSnapshot(
    "[Error: Have to answer at least one question.]"
  );
});

test("errors if quantity greater than maxQuestions", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuestions("Entertainment: Video Games", "easy", config.maxQuestions + 1)
  );
  await waitForNextUpdate();
  expect(result.current.error).toMatchInlineSnapshot(
    "[Error: Sorry, you can only have 10 in a quiz.]"
  );
});

test("returns an array of questions", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuestions("Entertainment: Video Games", "easy", 2)
  );
  await waitForNextUpdate();
  expect(result.current.questions).toHaveLength(2);
});
