import { Button } from "@/src/components/ui";
import type { ComponentProps } from "react";
import type { FriendsPageUsersType } from "@/src/services/user";
import clsx from "clsx";

interface IProps extends Omit<ComponentProps<"button">, "onClick"> {
  activeFilterType: FriendsPageUsersType;
  filterType: FriendsPageUsersType;
  changeFriendsFilter: (type: FriendsPageUsersType) => void;
}

export function FriendsHeaderFiltersButton({
  activeFilterType,
  filterType,
  changeFriendsFilter,
  className,
  children,
  ...props
}: IProps) {
  const isActive = activeFilterType === filterType;

  return (
    <Button
      variant={!isActive ? "contained" : "transparent"}
      className={clsx(
        !isActive ? "h-fit py-1.5" : "h-fit border-2 !border-[var(--main-color)] py-1.5",
        className
      )}
      {...props}
      onClick={() => changeFriendsFilter(filterType)}
    >
      {children}
    </Button>
  );
}