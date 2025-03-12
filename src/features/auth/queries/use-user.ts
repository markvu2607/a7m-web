import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { getMe } from "../services";
import { useAuth } from "../store";

export const useUser = () => {
  const navigate = useNavigate();
  const { clear } = useAuth();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getMe();
      if (!response.success) {
        clear();
        navigate({ to: "/login" });
        return null;
      }
      return response.data!;
    },
    enabled: !!useAuth.getState().token,
    // staleTime: 60 * 60 * 1000,
  });
};
