import { Button } from "@/src/components/ui";
import Link from "next/link";
import type { ReactNode } from "react";

interface ILayoutSidebarButtonProps {
  link: string;
  icon: ReactNode;
  pathname: string;
}

export function LayoutSidebarButton({ link, icon, pathname }: ILayoutSidebarButtonProps) {
  return (
    <Link href={link}>
      <Button isIcon={true} variant={pathname === link ? "contained" : "transparent"}>
        {icon}
      </Button>
    </Link>
  );
}
