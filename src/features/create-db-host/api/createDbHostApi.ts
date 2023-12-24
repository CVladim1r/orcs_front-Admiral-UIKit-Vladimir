import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateDbHostData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateDbHost(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (dbHostData: CreateDbHostData) => {
      await oraculusApi.createDbHost(dbHostData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['db-hosts'],
      });
      toast.success('Хост базы данных создан успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создания хоста базы данных');
    },
  });
}
