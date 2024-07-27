"use client";

import type { Nullable } from "@/src/types/general/nullable";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";

type ScrollToType = "top" | "bottom";

export const useScrollPagination = <Tag extends HTMLElement>(
  callback: () => void,
  type: ScrollToType,
  extenralRef: Nullable<RefObject<Tag>> = null
) => {
  const listRef = useRef<Tag>(null);
  const ref = extenralRef ? extenralRef : listRef;

  useEffect(() => {
    if (!ref || !ref.current) return;
    const r = ref.current;
    r.addEventListener("scroll", handleScroll);

    return () => {
      if (!r) return;
      r.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (!ref || !ref.current) return;
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

    if (
      (distanceToBottom < 1 && type === "bottom") ||
      (scrollTop < 1 && type === "top")
    ) {
      callback();
    }
  };

  return ref;
};
