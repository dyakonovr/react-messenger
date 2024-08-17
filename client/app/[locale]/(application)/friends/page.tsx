import type { Locales } from "@/i18n";
import FriendsPage from "@/src/components/screens/Friends/page";
import { unstable_setRequestLocale } from "next-intl/server";

function Friends({ params: { locale } }: { params: { locale: Locales } }) {
  unstable_setRequestLocale(locale);

  return <FriendsPage />;
}

export default Friends;
