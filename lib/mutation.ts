import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteResult } from 'mongodb';
import type { Movie } from '@/types';

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

export const useMovieMutation = makeMutation<Movie>('/api/movie', 'movies');
