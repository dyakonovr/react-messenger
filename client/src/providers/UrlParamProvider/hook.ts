"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { UrlParamsContextType } from "./type";

export function useUrlParamsProvider(): UrlParamsContextType {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParams = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const setParams = (newParams: Record<string, string | undefined | null>) => {
    const current = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });
    updateUrl(current);
  };

  const addUrlParam = useCallback(
    (key: string, value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.append(key, value);
      updateUrl(current);
    },
    [searchParams]
  );

  const deleteUrlParam = (key: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete(key);
    updateUrl(current);
  };

  const clearUrlParams = useCallback(() => {
    updateUrl(new URLSearchParams());
  }, []);

  const updateUrl = (params: URLSearchParams) => {
    const search = params.toString();
    const query = search ? `?${search}` : "";
    router.push(`${window.location.pathname}${query}`);
    // setSearchParams(params);
  };

  const getParamValue = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const hasParam = useCallback(
    (key: string) => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  return {
    getParams,
    setParams,
    addUrlParam,
    deleteUrlParam,
    clearUrlParams,
    getParamValue,
    hasParam
  };
}
