import { oraculusApi } from '@/shared/api/oraculus-api';
import { EditUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useEditUser(queryClient: QueryClient, userId: string) {
  return useMutation({
    mutationFn: async (newUserData: EditUserData) => {
      await oraculusApi.updateUser(newUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['users', userId],
      });
      toast.success('Пользователь успешно изменен');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка изменения пользователя');
    },
  });
}
