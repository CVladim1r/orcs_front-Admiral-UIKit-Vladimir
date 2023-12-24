import { oraculusApi } from '@/shared/api/oraculus-api';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteHostUser(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (hostUserId: string) => {
      await oraculusApi.deleteHostUser(hostUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['host-user'],
      });
      toast.success('Хост пользователь удален успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка удаления хост пользователя');
    },
  });
}
