import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { LoginSchema } from "../schemas/login.schema";
import { login } from "../services";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const { email, password } = data;
      await login(email, password);
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
