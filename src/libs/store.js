import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiFetch } from './request';

export const useStore = create(
  persist(
    (set) => ({
      user: {},
      group: {},
      doFetchUser: async () => {
        try {
          const response = await apiFetch({ method: 'GET' }, `/api/users`);
          console.log({response})
          set({ user: response }); 
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
    }),
    {
      name: 'user-store', // Name for local storage key
      whitelist: ['user'], // State keys to persist
    }
  )
);
