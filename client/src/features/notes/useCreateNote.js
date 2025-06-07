import { useMutation } from "@tanstack/react-query";
import { createNote as  createNoteApi } from "../../apis/apiNotes";
import toast from "react-hot-toast";

export const useCreateNote = () => {
  const mutation = useMutation({
    mutationFn: createNoteApi,
    onSuccess: (data) => {
        toast.success(data.message);
        console.log("Success:", data);
      },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createNote: mutation.mutate, isPending: mutation.isPending };
};
