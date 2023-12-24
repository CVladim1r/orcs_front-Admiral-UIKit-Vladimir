import { oraculusApi } from '@/shared/api/oraculus-api';
import { RevertToVdbSnapshotData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useRevertToVdbSnapshot(
  queryClient: QueryClient,
  vdbId: string,
) {
  return useMutation({
    mutationFn: async (revertToVdbSnapshotData: RevertToVdbSnapshotData) => {
      await oraculusApi.revertToVdbSnaphsot(revertToVdbSnapshotData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vdbs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['vdb', vdbId],
      });
      toast.success('К VDB успешно применен снимок');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка применения снимка к VDB');
    },
  });
}
