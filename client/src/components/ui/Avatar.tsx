"use client";

import { clsx } from "clsx";
import type { ImageProps } from "next/image";
import Image from "next/image";

type IAvatarProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"] | null;
  nickname: string;
};

export function getInitials(nickname: string): string {
  return nickname
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({ src, alt, nickname, className, ...props }: IAvatarProps) {
  const initials = getInitials(nickname);

  return src ? (
    <Image
      src={src}
      width={48}
      height={48}
      className={clsx("rounded-full", className)}
      alt={alt ?? nickname}
      {...props}
    />
  ) : (
    <div
      className={clsx(
        "flex size-12 select-none items-center justify-center rounded-full bg-[var(--main-color)] text-xl font-bold text-white",
        className
      )}
    >
      {initials}
    </div>
  );
}
