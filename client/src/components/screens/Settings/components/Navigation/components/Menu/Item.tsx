import { Typography } from "@/src/components/ui";
import classes from "./styles.module.css";
import type { ReactNode } from "react";
import Link from "next/link";

interface ISettingsMenuItemProps {
  name: string;
  icon: ReactNode;
  href: string;
}

function SettingsMenuItem({ name, icon, href }: ISettingsMenuItemProps) {
  return (
    <Link href={href} className={classes.menu_item}>
      {icon}
      <Typography tag="p" variant="regular" className="font-bold">
        {name}
      </Typography>
    </Link>
  );
}

export default SettingsMenuItem;
