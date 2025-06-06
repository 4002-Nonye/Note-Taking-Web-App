import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../apis/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { logout: mutation.mutate };
}
