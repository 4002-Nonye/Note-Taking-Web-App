import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote as createNoteApi } from "../../apis/apiNotes";
import toast from "react-hot-toast";

export function useCreateNote() {
    const queryClient= useQueryClient()
  const mutation = useMutation({
    mutationFn: createNoteApi,
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.message);
    queryClient.invalidateQueries(['notes'])
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
  return { createNote: mutation.mutateAsync, isPending: mutation.isPending };
}
