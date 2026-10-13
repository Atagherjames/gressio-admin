import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceApi, FetchAdminProductsParams } from '../api/marketplace.api';
import { toast } from 'sonner';

export const useAdminProducts = (params: FetchAdminProductsParams) => {
  return useQuery({
    queryKey: ['adminProducts', params],
    queryFn: () => marketplaceApi.getAdminProducts(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useProductApprovalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      marketplaceApi.setProductApproval(id, isPublished),
    onSuccess: (data, variables) => {
      toast.success(
        variables.isPublished
          ? `Product "${data.title}" approved and published!`
          : `Product "${data.title}" has been unlisted.`
      );
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to update product approval status';
      toast.error(msg);
    },
  });
};
