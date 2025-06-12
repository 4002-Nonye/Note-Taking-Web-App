import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logout as logoutApi } from '../../apis/apiAuth';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      localStorage.clear();
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { logout: mutation.mutate };
}
