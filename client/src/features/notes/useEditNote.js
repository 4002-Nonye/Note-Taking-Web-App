import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNote as editNoteApi } from "../../apis/apiNotes";
import toast from "react-hot-toast";

export function useEditNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editNoteApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["note"]);
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
  return { editNote: mutation.mutate, isPending: mutation.isPending };
}
