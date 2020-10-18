import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { Category } from "../store/category";
import { Question, QuestionDifficultyLevel } from "../store/question";

let categoryCache: Category[];

const buildQueryString = (
  topic: string,
  difficulty: QuestionDifficultyLevel,
  quantity: number
): string => {
  if (!categoryCache) {
    throw Error("Category cache is empty.");
  }

  return `?amount=${encodeURIComponent(quantity)}&category=${encodeURIComponent(
    15
  )}&difficulty=${encodeURIComponent(difficulty)}`;
};

export const useQuestions = (
  topic: string,
  difficulty: QuestionDifficultyLevel,
  quantity: number
) => {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(config.apiUrl);
        setQuestions(data.result);
      } catch (e) {
        setError(Error(e.message));
      } finally {
        setLoading(false);
      }
    };

    if (!topic) {
      setError(Error("No topic provided."));
    }

    if (quantity < 1) {
      setError(Error("Have to answer at least one question."));
    }

    if (quantity > config.maxQuestions) {
      setError(
        Error(`Sorry, you can only have ${config.maxQuestions} in a quiz.`)
      );
    }

    fetchQuestions();
  }, []);

  return { error, loading, questions };
};
