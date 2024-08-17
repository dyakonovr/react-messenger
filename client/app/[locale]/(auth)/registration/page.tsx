import type { Locales } from "@/i18n";
import Registration from "@/src/components/screens/Registration";
import { unstable_setRequestLocale } from "next-intl/server";

export default function RegistrationPage({
  params: { locale }
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);

  return <Registration />;
}
