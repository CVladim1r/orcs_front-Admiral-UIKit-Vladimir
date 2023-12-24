import { oraculusApi } from '@/shared/api/oraculus-api';
import { useQuery } from '@tanstack/react-query';

export function useLogs() {
  return useQuery({
    queryKey: ['logs'],
    queryFn: async () => {
      const response = await oraculusApi.getLogs(100);
      return response;
    },
  });
}
