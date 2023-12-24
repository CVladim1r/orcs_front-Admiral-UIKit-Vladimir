import { oraculusApi } from '@/shared/api/oraculus-api';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteVdb(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (vdbId: string) => {
      await oraculusApi.deleteVdb(vdbId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vdbs'],
      });
      toast.success('VDB удалена успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка удаления VDB');
    },
  });
}
