import { Typography } from "@/src/components/ui";
import classes from "./styles.module.css";
import type { ReactNode } from "react";

interface ISettingsMenuItemProps {
  name: string;
  icon: ReactNode;
}

function SettingsMenuItem({ name, icon }: ISettingsMenuItemProps) {
  return (
    <div className={classes.menu_item}>
      {icon}
      <Typography tag="p" variant="regular" className="font-bold">
        {name}
      </Typography>
    </div>
  );
}

export default SettingsMenuItem;
