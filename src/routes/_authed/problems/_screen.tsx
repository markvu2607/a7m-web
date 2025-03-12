import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/problems/_screen")({
  component: ScreenLayout,
});

function ScreenLayout() {
  return (
    <div className="h-[calc(100vh-3rem)] p-2">
      <Outlet />
    </div>
  );
}
