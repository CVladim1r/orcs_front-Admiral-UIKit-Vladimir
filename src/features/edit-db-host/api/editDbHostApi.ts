import { oraculusApi } from '@/shared/api/oraculus-api';
import { EditDbHostData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useEditDbHost(queryClient: QueryClient, dbHostId: string) {
  return useMutation({
    mutationFn: async (newUserData: EditDbHostData) => {
      await oraculusApi.updateDbHost(newUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['db-hosts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['db-host', dbHostId],
      });
      toast.success('Хост базы данных успешно изменен');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка изменения хоста базы данных');
    },
  });
}
