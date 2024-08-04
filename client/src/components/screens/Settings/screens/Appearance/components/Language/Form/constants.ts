import { LocalesZodEnum } from "@/i18n";
import { z } from "zod";

export const languageChangeFormSchema = z.object({
  language: LocalesZodEnum
});

export type LanguageChangeFormSchemaType = z.infer<typeof languageChangeFormSchema>;
