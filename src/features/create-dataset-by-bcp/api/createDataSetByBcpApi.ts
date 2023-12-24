import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateDataSetByBcpData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateDataSetByBcp(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (dataSetByBcpData: CreateDataSetByBcpData) => {
      await oraculusApi.createDataSetByBcp(dataSetByBcpData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['data-sets'],
      });
      toast.success('Набор данных успешно создан из резервной копии');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создания набора данных из резервной копии');
    },
  });
}
