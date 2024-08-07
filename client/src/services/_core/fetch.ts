import AuthService from "@/src/services/auth";
import { useUserStore } from "@/src/stores/useUserStore";
import Router from "next/router";

export const baseApiUrl = process.env.NEXT_PUBLIC_SERVER_PATH + "/api";

export async function customFetch(
  url: string,
  options?: RequestInit,
  isRepeat: boolean = false
) {
  const finalUrl = `${baseApiUrl}/${url}`;
  const response = await fetch(finalUrl, {
    credentials: "include",
    headers: {
      ...options?.headers
    },
    ...options
  });

  if (response.status === 403) {
    if (isRepeat) {
      Router.push("/login");
      return response;
    }

    const refreshResponse = await AuthService.getNewTokens();

    if (refreshResponse.error !== null || refreshResponse.data === null) {
      Router.push("/login");
      return response;
    }

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
  }

  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }

  return response;
}
