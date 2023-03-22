export interface Movie {
  _id?: string;
  title: string;
}

export interface User {
  _id?: string;
  name: string;
  avatar: string;
}

export interface Category {
  _id?: string;
  name: string;
  year: number;
}

export interface Nomination {
  _id?: string;
  movie: Movie;
  category: Category;
  win: boolean;
}

export interface Selection {
  _id?: string;
  user: User;
  nomination: Nomination;
}
