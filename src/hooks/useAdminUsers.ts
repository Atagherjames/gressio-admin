import { useQuery } from '@tanstack/react-query';
import { usersApi, FetchUsersParams } from '../api/users.api';

export const useAdminUsers = (params: FetchUsersParams) => {
  return useQuery({
    queryKey: ['adminUsers', params],
    queryFn: () => usersApi.getUsers(params),
    placeholderData: (previousData) => previousData,
  });
};
