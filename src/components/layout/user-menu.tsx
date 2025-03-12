import { useNavigate } from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/features/auth/queries/use-logout-mutation";
import { useAuth } from "@/features/auth/store";

import { Button } from "../ui/button";

export const UserMenu = () => {
  const { user } = useAuth();
  const { mutate: logout } = useLogoutMutation();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
        <Button variant="outline" onClick={() => navigate({ to: "/register" })}>
          Register
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src="/avatar.jpeg"
          alt={user?.username}
          className="h-6 w-6 rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
