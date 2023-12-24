import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateUser(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (userData: CreateUserData) => {
      await oraculusApi.createUser(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('Пользователь создан успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создания пользователя');
    },
  });
}
