import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { LoginSchema } from "../schemas/login.schema";

export const useLoginMutation = () => {
  const [, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (data.email === "markvu.work@gmail.com") {
        setIsAuthenticated(true);
      }
    },
  });
};
