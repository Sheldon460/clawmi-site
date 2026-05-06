// SBTI 类型定义

export type PersonalityType = 'DEAD' | 'GRASS' | 'MONKEY' | 'LOSER' | 'GOD' | 'TROLL' | 'SHIT' | 'PEACE';

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface Answer {
  questionId: number;
  selectedOption: number;
}

export interface Result {
  type: PersonalityType;
  typeName: string;
  code: string;
  matchRate: number;
  description: string;
  dimensions: {
    label: string;
    score: number;
    maxScore: number;
  }[];
}

export interface TestProgress {
  currentQuestion: number;
  totalQuestions: number;
  answers: Answer[];
}

export type Screen = 'hero' | 'test' | 'result';
