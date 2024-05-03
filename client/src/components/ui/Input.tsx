import { clsx } from "clsx";
import { forwardRef, type ComponentProps, type ReactNode } from "react";

interface IInputProps extends ComponentProps<"input"> {
  startIconSlot?: ReactNode;
  rootClassName?: string;
  // endIconSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ startIconSlot, className, rootClassName, ...props }, ref) => {
    return (
      <div className={clsx("relative", rootClassName)}>
        {startIconSlot && (
          <div className="absolute bottom-1/2 left-3 translate-y-2/4">
            {startIconSlot}
          </div>
        )}
        <input
          ref={ref}
          type="text"
          className={clsx(
            className,
            "w-full rounded-[10px] bg-[#EAF2FE] px-3.5 py-2 font-semibold placeholder:text-[var(--main-color)]",
            startIconSlot ? "pl-12" : ""
          )}
          placeholder="Search"
          {...props}
        />
      </div>
    );
  }
);
