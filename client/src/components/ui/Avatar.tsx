"use client";

import { clsx } from "clsx";
import type { ImageProps } from "next/image";
import Image from "next/image";

type IAvatarProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"] | null;
  nickname: string;
  isLocalImage?: boolean;
};

export function Avatar({
  src,
  alt,
  nickname,
  isLocalImage = false,
  className,
  ...props
}: IAvatarProps) {
  return src ? (
    <Image
      src={!isLocalImage ? process.env.NEXT_PUBLIC_SERVER_PATH + "/" + src : src}
      width={48}
      height={48}
      className={clsx("h-12 max-h-12 min-w-12 rounded-full", className)}
      alt={alt ?? nickname}
      {...props}
    />
  ) : (
    <div
      className={clsx(
        "flex size-12 min-w-12 select-none items-center justify-center rounded-full bg-[var(--main-color)] text-xl font-bold text-white",
        className
      )}
    >
      {nickname[0].toUpperCase()}
    </div>
  );
}
