"use client";

import type { Nullable } from "@/src/types/general/nullable";
import type { RefObject } from "react";
import { useEffect, useRef, useCallback } from "react";

type ScrollToType = "top" | "bottom";

export const useScrollPagination = <Tag extends HTMLElement>(
  callback: () => void,
  type: ScrollToType,
  externalRef: Nullable<RefObject<Tag>> = null
) => {
  const listRef = useRef<Tag>(null);
  const ref = externalRef ? externalRef : listRef;
  const previousScrollHeight = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (!ref || !ref.current) return;
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

    if (type === "bottom" && distanceToBottom < 1) {
      callback();
    }
    if (type === "top" && scrollTop < 1) {
      previousScrollHeight.current = scrollHeight;
      callback();
    }
  }, [callback, type, ref]);

  useEffect(() => {
    if (!ref || !ref.current) return;
    const r = ref.current;
    r.addEventListener("scroll", handleScroll);

    return () => {
      if (!r) return;
      r.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, ref]);

  useEffect(() => {
    if (!ref || !ref.current) return;

    const r = ref.current;
    const adjustScrollPosition = () => {
      if (type === "top" && previousScrollHeight.current !== null) {
        r.scrollTop = r.scrollHeight - previousScrollHeight.current;
        previousScrollHeight.current = null;
      }
    };

    // Подождем, пока DOM отрендерится, затем скорректируем позицию скролла
    const observer = new MutationObserver(() => {
      adjustScrollPosition();
    });

    observer.observe(r, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [type, ref]);

  return ref;
};
