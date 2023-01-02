// Answer options
export interface AnswerOptions {
  [index: number]: string;
}

export type Publication = {
  link: string;
  authorAndTitle: string;
};

export type Categories =
  | "Fatigue"
  | "Muscle Soreness"
  | "Sleep Quality"
  | "Stress"
  | "Mood";

export type CategoryAndOptions = {
  category: Categories;
  answerOptions: AnswerOptions;
};
