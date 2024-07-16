import { Button } from "@/src/components/ui";
import Link from "next/link";
import type { ReactNode } from "react";

interface ILayoutSidebarButtonProps {
  link: string;
  icon: ReactNode;
  pathname: string;
}

export function LayoutSidebarButton({ link, icon, pathname }: ILayoutSidebarButtonProps) {
  const isSelected = pathname === link || pathname.startsWith(`${link}/`);

  return (
    <Link href={link}>
      <Button isIcon={true} variant={isSelected ? "contained" : "transparent"}>
        {icon}
      </Button>
    </Link>
  );
}
