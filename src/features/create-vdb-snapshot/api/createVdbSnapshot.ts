import { oraculusApi } from '@/shared/api/oraculus-api';
import { CreateVdbSnapshotData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateVdbSnapshot(queryClient: QueryClient, vdbId: string) {
  return useMutation({
    mutationFn: async (vdbSnapshotData: CreateVdbSnapshotData) => {
      await oraculusApi.createVdbSnapshot(vdbSnapshotData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vdbs-snapshots', vdbId],
      });
      toast.success('Снимок VDB создан успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка создание снимка VDB');
    },
  });
}
