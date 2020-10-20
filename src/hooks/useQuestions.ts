import axios from "axios";
import { flow } from "mobx";
import { useEffect } from "react";
import config from "../config";
import { QuestionDifficultyLevel } from "../store/question";
import { useQuiz } from "./useQuiz";

const buildRequestUrl = (
  category: number,
  difficulty: QuestionDifficultyLevel,
  quantity: number
): string =>
  `${config.apiUrl}?amount=${encodeURIComponent(
    quantity
  )}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(
    difficulty
  )}`;

export const useQuestions = () => {
  const quiz = useQuiz();

  useEffect(() => {
    const fetchQuestions = flow(function* () {
      try {
        quiz.loading = true;
        const {
          data: { results },
        } = yield axios.get(
          buildRequestUrl(quiz.categoryId, quiz.difficulty, quiz.quantity)
        );
        quiz.questions.replace(results);
        quiz.ready = true;
      } catch (e) {
        quiz.error = Error(e.message);
        quiz.ready = false;
      } finally {
        quiz.loading = false;
      }
    });

    if (!quiz.categoryId) {
      quiz.error = Error("No category provided.");
      return;
    }

    if (quiz.quantity < 1) {
      quiz.error = Error("Have to answer at least one question.");
      return;
    }

    if (quiz.quantity > config.maxQuestions) {
      quiz.error = Error(
        `Sorry, you can only have ${config.maxQuestions} in a quiz.`
      );
      return;
    }

    if (!quiz.loading && !quiz.error && !quiz.ready) {
      fetchQuestions();
    }
  }, [
    quiz.categoryId,
    quiz.difficulty,
    quiz.error,
    quiz.loading,
    quiz.quantity,
    quiz.questions,
    quiz.ready,
  ]);
};
