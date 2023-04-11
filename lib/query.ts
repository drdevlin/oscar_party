import type { Category, Nominee, Nomination, User, Selection } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Model Queries
interface Enabler {
  enabled: boolean;
}

const makeQuery = <Model>(endpoint: string, name: string) => (init?: RequestInit, enabler?: Enabler) => {
  return useQuery<Model[] | null>({
    queryKey: [name, JSON.stringify(init)].filter(Boolean),
    queryFn: async () => {
      const body = init?.body && typeof init.body === 'string' ? JSON.parse(init.body) : '';
      const params = body ? `?${new URLSearchParams(body).toString()}` : '';
      delete init?.body;
      const response = await fetch(endpoint + params, init);
      return response.ok ? (await response.json()).data : null;
    },
    enabled: !enabler || enabler.enabled,
  });
};

export const useNomineeQuery = makeQuery<Nominee>('/api/nominee', 'nominees');

export const useUserQuery = makeQuery<User>('/api/user', 'users');

export const useCategoryQuery = makeQuery<Category>('/api/category', 'categories');

export const useNominationQuery = makeQuery<Nomination>('/api/nomination', 'nominations');

export const useSelectionQuery = makeQuery<Selection>('/api/selection', 'selections');

// Other
export const useWinnerQuery = () => (useQuery<string[] | null>({
  queryKey: ['winner'],
  queryFn: async () => {
    const response = await fetch('/api/winner/2022');
    return response.ok ? (await response.json()).data : null;
  },
}));
