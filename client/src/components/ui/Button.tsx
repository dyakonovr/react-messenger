import { clsx } from "clsx";
import { Loader2 as LoaderIcon } from "lucide-react";
import { forwardRef, type ComponentProps, type ReactNode } from "react";

type ButtonVariant = "transparent" | "contained";
interface IButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
  variant?: ButtonVariant;
  isIcon?: boolean;
  children: ReactNode;
}

type StylesType = { [key in ButtonVariant]: string };
const styles: StylesType = {
  contained:
    "border-[var(--main-color)] bg-[var(--main-color)] text-white enabled:hover:text-[var(--main-color)] enabled:hover:bg-transparent",
  transparent:
    "border-transparent text-[var(--main-color)] enabled:hover:bg-[var(--main-color)] enabled:hover:text-white"
};

const loadingIconStyles = {
  icon: "size-6 animate-spin",
  default: "-ml-5 mr-2 size-4 animate-spin"
};

const iconButtonStyles = "p-3";

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { children, variant = "contained", isIcon, loading = false, className, ...props },
    ref
  ) => {
    const isIconHide = isIcon && loading;

    return (
      <button
        type="button"
        {...props}
        disabled={loading}
        ref={ref}
        className={clsx(
          "rounded-xl border-2 p-1.5 transition-colors disabled:opacity-80",
          styles[variant],
          isIcon ? iconButtonStyles : "",
          className
        )}
      >
        <div className="flex items-center justify-center">
          {loading && (
            <LoaderIcon
              className={isIcon ? loadingIconStyles.icon : loadingIconStyles.default}
            />
          )}
          {!isIconHide && children}
        </div>
      </button>
    );
  }
);
