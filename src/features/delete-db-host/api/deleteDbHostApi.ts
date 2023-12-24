import { oraculusApi } from '@/shared/api/oraculus-api';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteDbHost(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async (hostId: string) => {
      await oraculusApi.deleteDbHost(hostId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['db-hosts'],
      });
      toast.success('DB Host удален успешно');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка удаления DB Host');
    },
  });
}
