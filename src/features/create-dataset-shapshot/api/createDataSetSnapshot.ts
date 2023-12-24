import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateDataSetSnapshotData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateDataSetSnapshot(queryClient: QueryClient, dataset: string) {
  return useMutation({
    mutationFn: async (DataSetSnapshotData: CreateDataSetSnapshotData) => {
      await oraculusApi.createDataSetSnapshot(DataSetSnapshotData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['datasets-snapshots', dataset],
      });
      toast.success('Снимок DataSet создан успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создание снимка DataSet');
    },
  });
}
