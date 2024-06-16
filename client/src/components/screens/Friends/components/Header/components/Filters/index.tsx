import { useFriendsFilter } from "./useFriendsFilter";
import { FriendsHeaderFiltersButton } from "./Button";

export function FriendsHeaderFilters() {
  const { changeFriendsFilter, activeType } = useFriendsFilter();

  return (
    <div className="flex items-center gap-2">
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"friends"}
        activeFilterType={activeType}
      >
        Friends
      </FriendsHeaderFiltersButton>
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"all"}
        activeFilterType={activeType}
      >
        All&nbsp;users
      </FriendsHeaderFiltersButton>
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"sent"}
        activeFilterType={activeType}
      >
        Sent&nbsp;requests
      </FriendsHeaderFiltersButton>
      <FriendsHeaderFiltersButton
        changeFriendsFilter={changeFriendsFilter}
        filterType={"received"}
        activeFilterType={activeType}
      >
        Received&nbsp;requests
      </FriendsHeaderFiltersButton>
    </div>
  );
}
