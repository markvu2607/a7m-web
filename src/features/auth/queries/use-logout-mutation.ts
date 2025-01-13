import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

export const useLogoutMutation = () => {
  const [, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);

  return useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAuthenticated(false);
    },
  });
};
