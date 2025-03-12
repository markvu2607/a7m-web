import { createFileRoute, redirect } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useAuth } from "@/features/auth/store";

export const Route = createFileRoute("/(public)/register")({
  loader: async () => {
    const isAuthenticated = useAuth.getState().token;
    if (isAuthenticated) {
      throw redirect({ to: "/problems" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col items-center justify-center  gap-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
