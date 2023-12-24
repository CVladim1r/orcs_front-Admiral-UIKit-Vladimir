import { oraculusApi } from '@/shared/api/oraculus-api';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteUser(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (userId: string) => {
      await oraculusApi.deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('Пользователь удален успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка удаления пользователя');
    },
  });
}
