export interface Nominee {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  avatar: string;
  pin?: string;
  showSelections?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  year: number;
  points: number;
}

export interface Nomination {
  _id: string;
  nominee: Nominee;
  category: Category;
  win: boolean;
}

export interface Selection {
  _id: string;
  user: User;
  nomination: Nomination;
}

export interface Tally {
  user: User;
  score: number;
}
