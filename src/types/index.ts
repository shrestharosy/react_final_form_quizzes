export interface IQuestion {
  question: string;
  answers: Array<IAnswer>;
  questionType: string;
}

export interface IAnswer {
  id?: string | null;
  content: string;
  isAnswer: boolean;
}
