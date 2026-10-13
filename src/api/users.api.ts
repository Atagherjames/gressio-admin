import apiClient from './client';
import { AdminUsersResponse } from '../types';

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export const usersApi = {
  getUsers: async (params?: FetchUsersParams): Promise<AdminUsersResponse> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    if (params?.role && params.role !== 'ALL') query.append('role', params.role);

    const response = await apiClient.get<any>(`/users/admin/all?${query.toString()}`);
    const res = response.data;

    // Support both raw format and nested pagination { data, meta }
    const rawList = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res)
      ? res
      : [];

    const meta = res?.meta || {
      total: rawList.length,
      page: params?.page || 1,
      lastPage: 1,
      limit: params?.limit || 10,
      adminCount: rawList.filter((u: any) => u.role === 'ADMIN').length,
      studentCount: rawList.filter((u: any) => u.role === 'USER').length,
    };

    return {
      data: rawList,
      meta,
    };
  },
};
