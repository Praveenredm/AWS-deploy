import { User } from '../types';

let currentUser: User | null = null;

export const authService = {
    login: async (email: string): Promise<User> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        currentUser = {
            id: 'u1',
            name: 'John Doe',
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=8b5cf6&color=fff`,
        };
        return currentUser;
    },

    logout: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        currentUser = null;
    },

    getCurrentUser: (): User | null => currentUser,

    isAuthenticated: (): boolean => currentUser !== null,
};
