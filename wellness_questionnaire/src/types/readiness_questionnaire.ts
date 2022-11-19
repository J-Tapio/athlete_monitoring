// Answer options
export interface AnswerOptions {
  [index: number]: string;
}

export type Publication = {
  link: string;
  authorAndTitle: string;
};

// Categories
export type Categories =
  | "Fatigue"
  | "Muscle Soreness"
  | "Sleep Quality"
  | "Stress"
  | "Mood";

// Specific category and answer options
export type CategoryAndOptions = {
  category: Categories;
  answerOptions: AnswerOptions;
};
