import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import type { LocalePrefix } from "next-intl/routing";
import { z } from "zod";

export const locales = ["en", "ru"] as const;
export const LocalesZodEnum = z.enum(locales);
export type Locales = z.infer<typeof LocalesZodEnum>;

export const localePrefix = "as-needed" satisfies LocalePrefix;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locales)) notFound();

  return {
    messages: (await import(`./public/locales/${locale}.json`)).default
  };
});
