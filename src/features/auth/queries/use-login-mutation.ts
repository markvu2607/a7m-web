import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { LoginSchema } from "../schemas/login.schema";
import { login } from "../services";
import { useAuth } from "../store";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const { email, password } = data;
      const response = await login({ email, password });

      if (!response.success) {
        throw new Error(response.message as string);
      }
      setToken(response.data!);
      return response;
    },
    onSuccess: () => {
      toast.success("Login successful");
      navigate({ to: "/problems" });
    },
    onError: () => {
      toast.error("Login failed");
    },
  });
};
