import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/problems/_screen")({
  component: ScreenLayout,
});

function ScreenLayout() {
  return (
    <div className="h-screen p-2">
      <Outlet />
    </div>
  );
}
