export type QuestionDifficultyLevel = "easy" | "medium" | "hard";
export type QuestionKind = "multiple" | "boolean";

export interface QuestionType {
  category: string;
  type: QuestionKind;
  difficulty: QuestionDifficultyLevel;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
