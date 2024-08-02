import { useFriendsHeaderFilters } from "./useFriendsHeaderFilters";
import { FriendsHeaderFiltersButton } from "./Button";
import { useTranslations } from "next-intl";

export function FriendsHeaderFilters() {
  const { changeFriendsFilter, activeType } = useFriendsHeaderFilters();
  const t = useTranslations("screens.Friends");

  return (
    <div className="flex items-center gap-2">
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"friends"}
        activeFilterType={activeType}
      >
        {t("types.only_friends")}
      </FriendsHeaderFiltersButton>
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"all"}
        activeFilterType={activeType}
      >
        {t("types.all_users")}
      </FriendsHeaderFiltersButton>
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"sent"}
        activeFilterType={activeType}
      >
        {t("types.sent_requests")}
      </FriendsHeaderFiltersButton>
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"received"}
        activeFilterType={activeType}
      >
        {t("types.received_requests")}
      </FriendsHeaderFiltersButton>
    </div>
  );
}
