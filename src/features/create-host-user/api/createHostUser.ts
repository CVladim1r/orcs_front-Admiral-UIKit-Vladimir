import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateHostUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateHostUser(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (hostUserData: CreateHostUserData) => {
      await oraculusApi.createHostUser(hostUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['host-users'],
      });
      toast.success('Хост-пользователь создан успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создания хост-пользователя');
    },
  });
}
