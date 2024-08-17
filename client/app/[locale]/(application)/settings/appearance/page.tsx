import type { Locales } from "@/i18n";
import { SettingsAppearanceScreen } from "@/src/components/screens/Settings/screens";
import { unstable_setRequestLocale } from "next-intl/server";

function SettingsAppearance({ params: { locale } }: { params: { locale: Locales } }) {
  unstable_setRequestLocale(locale);

  return <SettingsAppearanceScreen />;
}

export default SettingsAppearance;
