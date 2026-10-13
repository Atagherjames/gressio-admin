import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

const getStoredToken = () => localStorage.getItem('gressio_admin_token');
const getStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem('gressio_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getStoredToken(),
  user: getStoredUser(),
  isAuthenticated: !!getStoredToken(),

  setAuth: (token: string, user: User) => {
    localStorage.setItem('gressio_admin_token', token);
    localStorage.setItem('gressio_admin_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('gressio_admin_token');
    localStorage.removeItem('gressio_admin_user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
