import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
    username: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
