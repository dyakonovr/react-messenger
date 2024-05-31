"use client";

import { LayoutSidebar } from "@/src/components/layout";
import { useGetNewTokens } from "@/src/components/layout/useGetNewTokens";
import { type ReactNode } from "react";

export default function ApplicationLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  useGetNewTokens();

  return (
    <>
      <LayoutSidebar />
      <div className="w-full">{children}</div>
    </>
  );
}
