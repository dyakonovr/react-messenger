import type { Locales } from "@/i18n";
import Login from "@/src/components/screens/Login";
import { unstable_setRequestLocale } from "next-intl/server";

export default function LoginPage({
  params: { locale }
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);

  return <Login />;
}
