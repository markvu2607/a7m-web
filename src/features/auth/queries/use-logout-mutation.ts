import { useMutation } from "@tanstack/react-query";

import { logout } from "../services";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      await logout();
    },
  });
};
