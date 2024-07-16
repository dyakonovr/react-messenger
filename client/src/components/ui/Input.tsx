import { clsx } from "clsx";
import { forwardRef, type ComponentProps } from "react";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={clsx(
          "w-full rounded-[10px] bg-[var(--input-color)] px-3.5 py-2 font-semibold placeholder:text-[var(--main-color)]",
          "file:cursor-pointer file:rounded-l-[10px] file:border-0 file:bg-[var(--main-color)] file:p-2.5 file:text-sm",
          "file:mr-3 file:h-full file:font-medium file:text-white",
          className
        )}
        placeholder="Search"
        {...props}
      />
    );
  }
);
