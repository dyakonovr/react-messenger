"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useGetNewTokens } from "./hooks/usetGetNewTokens";
import { ApplicationLoader, LayoutSidebar } from "./components";
import type { ReactNode } from "react";
import { SocketProvider } from "./providers/SocketProvider";
import { useSetTheme } from "./hooks/useSetTheme";

const queryClient = new QueryClient();

function Layout({ children }: { children: ReactNode }) {
  useSetTheme();
  const isLoading = useGetNewTokens();
  if (isLoading) return <ApplicationLoader />;

  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex size-full max-[768px]:flex-col-reverse">
          <LayoutSidebar />
          <div className="size-full overflow-y-auto">{children}</div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default Layout;
