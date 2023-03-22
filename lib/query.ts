import type { Category, Movie, Nomination, User, Selection } from "@/types";
import { useQuery } from "@tanstack/react-query";

const makeQuery = <Model>(endpoint: string, name: string) => (init?: RequestInit) => {
  return useQuery<Model[] | null>({
    queryKey: [name, JSON.stringify(init)].filter(Boolean),
    queryFn: async () => {
      const response = await fetch(endpoint, init);
      return response.ok ? (await response.json()).data : null;
    },
  });
};

export const useMovieQuery = makeQuery<Movie>('/api/movie', 'movies');

export const useUserQuery = makeQuery<User>('/api/user', 'users');

export const useCategoryQuery = makeQuery<Category>('/api/category', 'categories');

export const useNominationQuery = makeQuery<Nomination>('/api/nomination', 'nominations');

export const useSelectionQuery = makeQuery<Selection>('/api/selection', 'selections');
