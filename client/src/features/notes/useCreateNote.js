import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createNote as createNoteApi } from '../../apis/apiNotes';

export function useCreateNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNoteApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['notes']);
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
  return { createNote: mutation.mutateAsync, isPending: mutation.isPending };
}
