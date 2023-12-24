import { oraculusApi } from '@/shared/api/oraculus-api';
import { EditHostUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useEditHostUser(queryClient: QueryClient, hostUserId: string) {
  return useMutation({
    mutationFn: async (newHostUserData: EditHostUserData) => {
      await oraculusApi.updateHostUser(newHostUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['host-users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['host-users', hostUserId],
      });
      toast.success('Хост-пользователь успешно изменен');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка изменения хост-пользователя');
    },
  });
}
