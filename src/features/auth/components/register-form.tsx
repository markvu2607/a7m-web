import { zodResolver } from "@hookform/resolvers/zod";
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

import { useRegisterMutation } from "../queries/use-register-mutation";
import { registerSchema, RegisterSchema } from "../schemas/register.schema";
import { RegisterRequest } from "../types";

export const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { mutate: register, isPending } = useRegisterMutation();

  const handleRegister = async (data: RegisterSchema) => {
    const registerData: RegisterRequest = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    register(registerData);
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
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
};
