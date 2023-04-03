import { create } from 'zustand';

export interface UserState {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userId: null,
  setUserId: (userId: string | null) => set({ userId }),
}));
