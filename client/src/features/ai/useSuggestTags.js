import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { suggestTags as suggestTagsApi } from '../../apis/apiAI';

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
