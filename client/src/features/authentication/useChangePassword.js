import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { changePassword as changePasswordApi } from '../../apis/apiAuth';

export function useChangePassword() {
  const mutation = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
  return { changePassword: mutation.mutate, isPending: mutation.isPending };
}
