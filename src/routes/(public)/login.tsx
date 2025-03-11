import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm } from "@/features/auth/components/login-form";
import { useAuth } from "@/features/auth/store";

export const Route = createFileRoute("/(public)/login")({
  loader: async () => {
    const isAuthenticated = useAuth.getState().token;
    if (isAuthenticated) {
      throw redirect({ to: "/problems" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
