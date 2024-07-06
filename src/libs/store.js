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
      doFetchGroup: async () => {
        try {
          const response = await apiFetch({ method: 'GET' }, `/api/group`);
          console.log({response})
          set({ group: response }); 
        } catch (error) {
          console.error('Error fetching group:', error);
        }
      },
      logout: () => {
        localStorage.clear();
        set({ user: {}, group: {} });
      },
    }),
    {
      name: 'store', // Name for local storage key
      whitelist: ['user', 'group'], // State keys to persist
    }
  )
);
