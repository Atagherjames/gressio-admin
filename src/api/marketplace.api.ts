import apiClient from './client';
import { AdminProductsResponse, MarketplaceProduct } from '../types';

export interface FetchAdminProductsParams {
  page?: number;
  limit?: number;
  status?: 'all' | 'pending' | 'published';
  search?: string;
}

export const marketplaceApi = {
  getAdminProducts: async (params?: FetchAdminProductsParams): Promise<AdminProductsResponse> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.status && params.status !== 'all') query.append('status', params.status);
    if (params?.search) query.append('search', params.search);

    const response = await apiClient.get<any>(`/marketplace/admin/all-products?${query.toString()}`);
    const res = response.data;

    const rawList = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res)
      ? res
      : [];

    const meta = res?.meta || {
      total: rawList.length,
      page: params?.page || 1,
      lastPage: 1,
      limit: params?.limit || 12,
      pendingCount: rawList.filter((p: any) => !p.isPublished).length,
      publishedCount: rawList.filter((p: any) => p.isPublished).length,
    };

    return {
      data: rawList,
      meta,
    };
  },

  setProductApproval: async (id: string, isPublished: boolean): Promise<MarketplaceProduct> => {
    const response = await apiClient.patch<any>(`/marketplace/admin/products/${id}/approval`, {
      isPublished,
    });
    return response.data?.data || response.data;
  },
};
