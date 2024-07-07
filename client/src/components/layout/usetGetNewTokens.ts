"use client";

import { useUserStore } from "@/src/stores/useUserStore";
import AuthService from "@/src/services/auth";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PagePaths } from "@/src/enums/PagePaths";

export const useGetNewTokens = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isLoadingRef = useRef(!user);
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    (async () => {
      try {
        // Запрос выполняется после логаута
        const response = await AuthService.getNewTokens();
        setUser(response.data);
        isLoadingRef.current = false;
      } catch (error) {
        console.log(error);
        router.push(PagePaths.LOGIN);
      }
    })();
  }, []);

  return isLoadingRef.current;
};
