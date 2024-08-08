"use client";

import { Button, useScreenLayoutWithSidebarContext } from "@/src/components/ui";
import { clsx } from "clsx";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";
import type { ComponentProps } from "react";

interface IProps extends Omit<ComponentProps<typeof Button>, "children"> {}

// The component is used only on "mobile" screens.
export function ScreenLayoutWithSidebarBackToSidebarButton(props: IProps) {
  const { setIsSidebarOnFullMobileScreen } = useScreenLayoutWithSidebarContext();

  return (
    <Button
      className={clsx("min-[840px]:hidden", props.className)}
      onClick={() => setIsSidebarOnFullMobileScreen(true)}
      isIcon
      {...props}
    >
      <ArrowLeftIcon />
    </Button>
  );
}
