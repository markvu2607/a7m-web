import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated"); //TODO: replace with context or zustand
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
