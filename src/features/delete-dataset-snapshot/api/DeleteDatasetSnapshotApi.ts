import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteDataSetSnapshot(
  queryClient: QueryClient,
  dataSetId: string,
) {
  return useMutation({
    mutationFn: async (snapshotId: string) => {
      // await oraculusApi.delete(snapshotId);
      console.log(snapshotId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['snapshots', dataSetId],
      });
      toast.success('Снимок БД удален успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка удаления снимка БД');
    },
  });
}
