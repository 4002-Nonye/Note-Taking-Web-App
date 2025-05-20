import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { register as registerApi } from "../apis/apiAuth";

export function useRegister() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/notes", { replace: true });
    },
    onError: (err) => {
      toast.error(err.error);
    },
  });

  return { register: mutation.mutate, isPending: mutation.isPending };
}
