import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "What's your name").max(50, "Hey, your name is too long"),
    lastName: z.string().min(1, "Your lastname is...?").max(50, "Don't be shy and write your lastname"),
    email: z.string().email("is this an email?").min(1, "What's your email"),
    password: z.string().min(6, "Not less than 6 please").max(20, "Not so long, 20 please"),
    confirmPassword: z.string().min(6, "Not less than 6 please").max(12, "Not so long, 20 please"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Sure? They arn't the same",
    path: ["confirmPassword"],
  });

export type SignUpFormFields = z.infer<typeof SignUpSchema>;
