import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUserLogin(queryClient: QueryClient) {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('Пользователь успешно вошел в систему');
    },
    onError: (e) => {
      console.error(e);
      toast.error('Ошибка входа');
    },
  });
}
