import { oraculusApi } from '@/shared/api/oraculus-api';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteDataSet(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (dataSetId: string) => {
      await oraculusApi.deleteDataSet(dataSetId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['data-sets'],
      });
      toast.success('Набор данных удален успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка удаления набора данных');
    },
  });
}
