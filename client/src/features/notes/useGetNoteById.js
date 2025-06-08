import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../apis/apiNotes";
import { useUser } from "../authentication/useUser";

export function useGetNoteById(id) {
  const { user, isLoading: isUserLoading } = useUser();

  // reload if the user id (logged in user) changes
  const query = useQuery({
    queryKey: ["note", user?.id, id],
    queryFn: () => getNoteById(id),
    enabled: !!user?.id && !!id && !isUserLoading,   // Only fetch note if we're in edit mode (noteId || id exists)
  });

  return {
    note: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
