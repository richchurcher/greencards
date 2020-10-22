jest.mock("axios");
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { mocked } from "ts-jest/utils";
import { useCategories } from "./useCategories";

const mockedAxios = mocked(axios, true);
const useCategoriesMock = {
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
  mockedAxios.get.mockResolvedValue(useCategoriesMock);
});

test("returns an array of categories", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCategories());
  await waitForNextUpdate();
  expect(result.current.categories).toHaveLength(2);
});
