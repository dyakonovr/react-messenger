import type { ReactNode } from "react";
import classes from "./styles.module.css";

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      className={`flex w-full items-center justify-center ${classes["auth-background"]} `}
    >
      <div className="min-w-[400px] rounded-2xl bg-white p-10">{children}</div>
    </div>
  );
}
