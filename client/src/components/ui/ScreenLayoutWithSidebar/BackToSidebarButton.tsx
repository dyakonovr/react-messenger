"use client";

import { Button, useScreenLayoutWithSidebarContext } from "@/src/components/ui";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";
import type { ComponentProps } from "react";

interface IProps extends Omit<ComponentProps<typeof Button>, "children"> {}

// The component is used only on "mobile" screens (max-width: 840px).
export function ScreenLayoutWithSidebarBackToSidebarButton(props: IProps) {
  const { setIsSidebarOnFullMobileScreen } = useScreenLayoutWithSidebarContext();
  const { isTablet } = useScreenLayoutWithSidebarContext();

  if (!isTablet) return null;

  return (
    <Button onClick={() => setIsSidebarOnFullMobileScreen(true)} isIcon {...props}>
      <ArrowLeftIcon />
    </Button>
  );
}
