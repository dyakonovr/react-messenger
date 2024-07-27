// @ts-expect-error

import { useRouter } from "next/navigation";
import { useCallback } from "react";

type PrimitiveType = boolean | string | number;

export const useAddUrlAttribute = () => {
  const router = useRouter();

  const addUrlAttribute = useCallback((name: string, value: PrimitiveType) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(name, String(value));
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  }, []);

  return addUrlAttribute;
};
