import { oraculusApi } from '@/shared/api/oraculus-api';
import { EdtiVdbData } from '@/shared/api/oraculus-api/OraculusApi';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useEditVdb(queryClient: QueryClient, vdbId: string) {
  return useMutation({
    mutationFn: async (newVdbData: EdtiVdbData) => {
      await oraculusApi.updateVdb(newVdbData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vdbs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['vdb', vdbId],
      });
      toast.success('VDB успешно изменена');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка изменения VDB');
    },
  });
}
