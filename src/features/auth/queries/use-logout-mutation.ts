import { useMutation } from "@tanstack/react-query";

import { logout } from "../services";
import { useAuth } from "../store";
import { useNavigate } from "@tanstack/react-router";

export const useLogoutMutation = () => {
  const { clear } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      clear();
      navigate({ to: "/login" });
    },
  });
};
