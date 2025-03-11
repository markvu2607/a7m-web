import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/features/auth/queries/use-register-mutation";
import {
  RegisterSchema,
  registerSchema,
} from "@/features/auth/schemas/register.schema";
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
  const form = useForm<RegisterSchema>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { mutate: register, isPending } = useRegisterMutation();

  const handleRegister = async (data: RegisterSchema) => {
    register(data);
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(handleRegister)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="font-bold" type="submit" disabled={isPending}>
          Register
        </Button>
      </form>
    </Form>
  );
}
