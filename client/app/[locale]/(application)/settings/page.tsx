import type { Locales } from "@/i18n";
import { SettingsAccountDataScreen } from "@/src/components/screens/Settings/screens";
import { unstable_setRequestLocale } from "next-intl/server";

function Settings({ params: { locale } }: { params: { locale: Locales } }) {
  unstable_setRequestLocale(locale);

  return <SettingsAccountDataScreen />;
}

export default Settings;
