import type { Locales } from "@/i18n";
import Home from "@/src/components/screens/Home";
import { unstable_setRequestLocale } from "next-intl/server";

export default function HomeNextPage({
  params: { locale }
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);

  return <Home />;
}
