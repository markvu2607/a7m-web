import { createFileRoute, redirect } from "@tanstack/react-router";

import { useLoginMutation } from "@/features/auth/queries/use-login-mutation";
import { useLogoutMutation } from "@/features/auth/queries/use-logout-mutation";

export const Route = createFileRoute("/(public)/login")({
  loader: async () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated"); //TODO: replace with context or zustand
    if (isAuthenticated) {
      throw redirect({ to: "/problems" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: login, isPending } = useLoginMutation();
  const { mutate: logout } = useLogoutMutation();

  return (
    <div>
      <button
        className="font-bold"
        onClick={() => {
          login({
            email: "markvu.work@gmail.com",
            password: "123456",
          });
        }}
        disabled={isPending}
      >
        Login
      </button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
