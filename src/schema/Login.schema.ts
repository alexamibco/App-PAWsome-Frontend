import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("It isn't a valid email").min(1, "El email es requerido"),
  password: z.string().min(1, "Hey, we need a password"),
  rememberMe: z.boolean(),
});

export type LoginFormFields = z.infer<typeof LoginSchema>;
