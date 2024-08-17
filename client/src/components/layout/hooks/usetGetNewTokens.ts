"use client";

import { useUserStore } from "@/src/stores/useUserStore";
import AuthService from "@/src/services/auth";
import { useEffect, useRef } from "react";
import { PagePaths } from "@/src/enums/PagePaths";
import { useRouter } from "@/src/utils/navigation";

export const useGetNewTokens = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isLoadingRef = useRef(!user);
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    connectToSocket();
  }, []);

  // Functions
  async function connectToSocket() {
    try {
      // Запрос выполняется после логаута
      const response = await AuthService.getNewTokens();

      if (response.data === null || response.error !== null)
        throw new Error("Unexpected error");

      setUser(response.data);
      isLoadingRef.current = false;
    } catch (error) {
      console.log(error);
      router.push(PagePaths.LOGIN);
    }
  }
  // Functions END

  return isLoadingRef.current;
};
