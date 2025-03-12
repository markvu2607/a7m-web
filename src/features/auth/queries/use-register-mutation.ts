import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { RegisterSchema } from "../schemas/register.schema";
import { register } from "../services";
import { useAuth } from "../store";
export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<RegisterSchema, "passwordConfirm">) => {
      const { email, password, username } = data;
      const response = await register({ email, password, username });
      if (!response.success) {
        throw new Error(response.message as string);
      }
      setToken(response.data!);
      return response;
    },
    onSuccess: () => {
      toast.success("Register successful");
      navigate({ to: "/problems" });
    },
    onError: () => {
      toast.error("Register failed");
    },
  });
};
