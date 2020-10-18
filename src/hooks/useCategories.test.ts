import { renderHook } from "@testing-library/react-hooks";
import { useCategories } from "./useCategories";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const useQuestionsMock = {
  data: {
    trivia_categories: [
      {
        id: 9,
        name: "General Knowledge",
      },
      {
        id: 10,
        name: "Entertainment: Books",
      },
    ],
  },
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(useQuestionsMock);
});

test("returns an array of categories", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCategories());
  await waitForNextUpdate();
  expect(result.current.categories).toHaveLength(2);
});
