import type { ReactNode } from "react";

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex w-full items-center justify-center bg-[#F0F4FA]">
      <div className="min-w-[400px] rounded-2xl bg-white p-10">
        {children}
      </div>
    </div>
  );
}
