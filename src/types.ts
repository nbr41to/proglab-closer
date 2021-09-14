/*
 * Input用の型を作らない代わりに、optionalを使う
 */

export type User = {
  id?: string;
  name: string;
  role?: 'admin' | 'closer' | 'unauthenticated';
};

export type ContentType = 'doing' | 'learned' | 'willLearn';

export type Content = {
  type?: ContentType;
  name?: string;
  text: string;
  colorNum?: number;
};

export type Room = {
  id?: string;
  title: string;
  date?: string;
  members?: string[];
  contents?: Content[];
  achieved?: boolean;
};

export type GameReview = {
  id?: string;
  score: number;
  title: string;
  review: string;
  reviewedBy: string;
  createdAt: string;
};

export type Game = {
  id?: string;
  title: string;
  createdBy: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  githubUrl: string;
  createdAt?: string;
  reviews: GameReview[];
};
