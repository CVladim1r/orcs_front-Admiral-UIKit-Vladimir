import { oraculusApi } from '@/shared/api/oraculus-api';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateVdbToLatestSnap(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (vdbId: string) => {
      await oraculusApi.updateVdbToLatestDSDnapshot(vdbId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vdbs'],
      });
      toast.success('VDB успешно обновлена');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка обновления VDB');
    },
  });
}
