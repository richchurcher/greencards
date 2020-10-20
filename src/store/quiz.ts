import { IObservableArray, observable } from "mobx";
import { Question, QuestionDifficultyLevel } from "./question";

export interface QuizStore {
  categoryId: number;
  currentQuestion: number;
  difficulty: QuestionDifficultyLevel;
  error?: Error;
  loading: boolean;
  ready: boolean;
  quantity: number;
  questions: IObservableArray<Question>;
  score: number;
}

const quizStore = observable<QuizStore>({
  categoryId: 0,
  currentQuestion: 0,
  difficulty: "easy",
  error: undefined,
  loading: false,
  ready: false,
  quantity: 1,
  questions: observable<Question>([]),
  score: 0,
});

export default quizStore;
