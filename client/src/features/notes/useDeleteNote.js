import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { deleteNote as deleteNoteApi } from '../../apis/apiNotes';

export function useDeleteNote() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: deleteNoteApi,
    onSuccess: (data) => {
      navigate('/notes');
      toast.success(data.message);
      queryClient.invalidateQueries(['notes']);
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });

  return { deleteNote: mutation.mutate, isPending: mutation.isPending };
}
