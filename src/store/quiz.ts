import { IObservableArray, observable } from "mobx";
import { QuestionDifficultyLevel, QuestionType } from "./question";

export const fromBase64 = (s: string): string =>
  Buffer.from(s, "base64").toString();

export interface QuizStore {
  categoryId: number;
  currentQuestion: number;
  difficulty: QuestionDifficultyLevel;
  error?: Error;
  loading: boolean;
  ready: boolean;
  quantity: number;
  questions: IObservableArray<QuestionType>;
  readonly question: QuestionType;
  readonly randomisedAnswers: string[];
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
  questions: observable<QuestionType>([]),
  score: 0,
  get question(): QuestionType {
    return this.questions[this.currentQuestion];
  },
  get randomisedAnswers(): string[] {
    const answers = [
      this.questions[this.currentQuestion].correct_answer,
      ...this.questions[this.currentQuestion].incorrect_answers,
    ];

    // See various sources, ostensibly via Knuth
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }

    return answers;
  },
});

export default quizStore;
