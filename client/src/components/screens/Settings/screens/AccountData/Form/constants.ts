import { z } from "zod";

// .or(z.literal("")) - ok, if empty
export const updateAccountDataFormSchema = z.object({
  nickname: z.string().min(2).or(z.literal("")),
  login: z.string().min(2).or(z.literal("")),
  oldPassword: z.string().min(4).or(z.literal("")),
  newPassword: z.string().min(4).or(z.literal("")),
  avatar: z.instanceof(FileList).or(z.undefined()).optional()
});

export type UpdateAccountDataFormSchemaType = z.infer<typeof updateAccountDataFormSchema>;