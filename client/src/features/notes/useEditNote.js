import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNote as editNoteApi } from "../../apis/apiNotes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditNote() {
  const queryClient = useQueryClient();
  const navigate= useNavigate()
  const mutation = useMutation({
    mutationFn: editNoteApi,
    onSuccess: (data) => {
      toast.success(data.message);
navigate('/notes')
      queryClient.invalidateQueries(["note", data.note._id]);
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });
  return { editNote: mutation.mutate, isPending: mutation.isPending };
}
