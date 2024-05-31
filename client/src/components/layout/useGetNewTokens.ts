"use client";

import { useUserStore } from "@/src/stores/user";
import AuthService from "@/src/services/auth";
import { useEffect } from "react";

export const useGetNewTokens = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) return;

    (async () => {
      try {
        // Запрос выполняется после логаута
        const response = await AuthService.getNewTokens();
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
};
