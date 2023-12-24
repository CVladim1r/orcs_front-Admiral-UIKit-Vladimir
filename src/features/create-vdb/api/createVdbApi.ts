import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateVdbData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateVdb(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (data: CreateVdbData) => {
      await oraculusApi.createVdb(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vdbs'],
      });
      toast.success('Виртуальная база данных создана успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создания виртуально базы данных');
    },
  });
}
