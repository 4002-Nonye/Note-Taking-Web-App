import { useMutation } from "@tanstack/react-query";
import { suggestTags as suggestTagsApi } from "../../apis/apiAI";
import toast from "react-hot-toast";

export function useSuggestTags() {
  const mutation = useMutation({
    mutationFn: suggestTagsApi,

    onError: (err) => toast.error(err.error),
  });

  return {
    suggestTags: mutation.mutate,
    isPending: mutation.isPending,
    tags: mutation.data,
  };
}
