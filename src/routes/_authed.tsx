import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useAuth } from "@/features/auth/store";

export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    const isAuthenticated = useAuth.getState().token;
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
