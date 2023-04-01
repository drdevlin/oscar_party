import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteResult } from 'mongodb';
import type { Category, Nominee, Nomination, User } from '@/types';

const makeMutation = <Model>(endpoint: string, name: string) => () => {
  const queryClient = useQueryClient();
  return useMutation<Model | DeleteResult | null, unknown, RequestInit>({
    mutationFn: async (init: RequestInit) => {
      const response = await fetch(endpoint, init);
      return response.ok ? (await response.json()).data : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [name] })
    },
  })
}

export const useNomineeMutation = makeMutation<Nominee>('/api/nominee', 'nominees');
export const useCategoryMutation = makeMutation<Category>('/api/category', 'categories');
export const useUserMutation = makeMutation<User>('/api/user', 'users');
export const useNominationMutation = makeMutation<Nomination>('/api/nomination', 'nominations');
export const useSelectionMutation = makeMutation<Selection>('/api/selection', 'selections');
