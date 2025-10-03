import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { editAccountSettings as editAccountSettingsApi } from '../../apis/apiAccountSettings';

export function useEditSettings() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editAccountSettingsApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['accountSettings']);
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
  return {
    editAccountSettings: mutation.mutate,
    isPending: mutation.isPending,
  };
}
