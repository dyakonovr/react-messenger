import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import type { LocalePrefix } from "next-intl/routing";

// Can be imported from a shared config
export const locales = ["en", "ru"];

export const localePrefix = "as-needed" satisfies LocalePrefix;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./public/locales/${locale}.json`)).default
  };
});
