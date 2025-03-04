import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { RegisterSchema } from "../schemas/register.schema";
import { register } from "../services";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const { email, password, passwordConfirm, name } = data;
      await register(email, password, passwordConfirm, name);
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
