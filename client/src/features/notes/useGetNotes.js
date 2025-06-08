import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../apis/apiNotes";

export function useGetNotes() {
  const query = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
  return {
    notes: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error :query.error
  };
}
