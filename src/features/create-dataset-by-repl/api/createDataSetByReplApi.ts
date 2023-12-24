import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateDataSetByReplData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateDataSetByRepl(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (dataSetByReplData: CreateDataSetByReplData) => {
      await oraculusApi.createDataSetByRepl(dataSetByReplData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['data-sets'],
      });
      toast.success('Набор данных успешно создан с помощью репликации');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создания набора данных с помощью репликации');
    },
  });
}
