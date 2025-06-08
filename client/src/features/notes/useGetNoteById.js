import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../apis/apiNotes";

export function useGetNoteById(id) {
  const query = useQuery({
    queryKey: ["note",id],
    queryFn: () => getNoteById(id),
    enabled: !!id
  });
  return {
    note: query.data,
    isPending: query.isPending,
    isError: query.isError,
  };
}
