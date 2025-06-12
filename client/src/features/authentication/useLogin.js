import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login as loginApi } from '../../apis/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.data);
      toast.success(data.message);
      navigate('/notes', { replace: true });
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });

  return { login: mutation.mutate, isPending: mutation.isPending };
}
