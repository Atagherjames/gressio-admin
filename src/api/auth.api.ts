import apiClient from './client';
import { LoginResponse } from '../types';

export interface LoginCredentials {
  identifier: string; // Email or Phone Number
  password: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};
