import { z } from "zod";

export const loginFormSchema = z.object({
  login: z.string().min(2, {
    message: "Login must be at least 2 characters."
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters."
  })
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
