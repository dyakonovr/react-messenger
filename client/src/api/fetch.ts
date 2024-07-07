import AuthService from "@/src/services/auth";
import Router from "next/router";
import { useUserStore } from "../stores/useUserStore";

export const baseApiUrl = "http://localhost:8080/api";

export async function customFetch(
  url: string,
  options?: RequestInit,
  isRepeat: boolean = false
) {
  const finalUrl = `${baseApiUrl}/${url}`;
  const response = await fetch(finalUrl, {
    credentials: "include",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json"
    },
    ...options
  });

  if (response.status === 403) {
    if (isRepeat) {
      Router.push("/login");
      return response;
    }

    const refreshResponse = await AuthService.getNewTokens();
    if (refreshResponse.response.ok) {
      useUserStore.getState().setUser(refreshResponse.data);
      return customFetch(
        url,
        {
          credentials: "include",
          headers: {
            ...options?.headers,
            "Content-Type": "application/json"
          },
          ...options
        },
        true
      );
    } else {
      Router.push("/login");
      return response;
    }
  }

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response;
}
