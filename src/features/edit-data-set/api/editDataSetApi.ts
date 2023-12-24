import { oraculusApi } from '@/shared/api/oraculus-api';
import { EditDataSetData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useEditDataSet(queryClient: QueryClient, dataSetId: string) {
  return useMutation({
    mutationFn: async (newDataSetData: EditDataSetData) => {
      await oraculusApi.updateDataSet(newDataSetData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['data-sets'],
      });
      queryClient.invalidateQueries({
        queryKey: ['data-set', dataSetId],
      });
      toast.success('Набор данных успешно изменен');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка изменения набора данных');
    },
  });
}
