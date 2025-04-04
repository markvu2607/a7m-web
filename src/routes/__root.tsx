import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

import { Header } from "@/components/layout/header";
import { Navbar } from "@/components/layout/navbar";
import { UserMenu } from "@/components/layout/user-menu";
import { getMe } from "@/features/auth/services";
import { useAuth } from "@/features/auth/store";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    loader: async () => {
      const { token, user } = useAuth.getState();
      if (token && !user) {
        const response = await getMe();
        if (!response.success) {
          useAuth.getState().clear();
        } else {
          useAuth.getState().setUser(response.data!);
        }
      }
    },
    component: RootLayout,
  }
);

function RootLayout() {
  return (
    <>
      <Header>
        <Navbar />
        <UserMenu />
      </Header>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
