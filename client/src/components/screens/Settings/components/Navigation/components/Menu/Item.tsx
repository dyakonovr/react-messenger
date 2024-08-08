"use client";

import { Typography, useScreenLayoutWithSidebarContext } from "@/src/components/ui";
import classes from "./styles.module.css";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/src/utils/navigation";

const SettingsMenuItemTypographyTag: ComponentProps<typeof Typography>["tag"] = "p";

interface ISettingsMenuItemProps
  extends ComponentProps<typeof SettingsMenuItemTypographyTag> {
  itemText: string;
  icon: ReactNode;
  href: string;
}

function SettingsMenuItem({ itemText, icon, href, ...props }: ISettingsMenuItemProps) {
  const { setIsSidebarOnFullMobileScreen } = useScreenLayoutWithSidebarContext();

  return (
    <Link
      href={href}
      className={classes.menu_item}
      onClick={() => setIsSidebarOnFullMobileScreen(false)}
    >
      {icon}
      <Typography tag="p" variant="regular" className="font-bold" {...props}>
        {itemText}
      </Typography>
    </Link>
  );
}

export default SettingsMenuItem;
