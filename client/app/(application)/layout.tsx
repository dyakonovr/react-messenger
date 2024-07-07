import Layout from "@/src/components/layout/page";
import type { ReactNode } from "react";

export default function ApplicationLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
