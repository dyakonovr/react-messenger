import { clsx } from "clsx";
import { forwardRef, type ComponentProps, type ReactNode } from "react";

type ButtonVariant = "transparent" | "contained";
interface IButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
  variant?: ButtonVariant;
  children: ReactNode;
}

type StylesType = { [key in ButtonVariant]: string };
const styles: StylesType = {
  contained:
    "border-[var(--main-color)] bg-[var(--main-color)] text-white hover:text-[var(--main-color)] hover:bg-transparent",
  transparent:
    "border-transparent text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white"
};

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, variant = "contained", className, loading, ...props }, ref) => {
    return (
      <button
        type="button"
        {...props}
        ref={ref}
        className={clsx(
          "rounded-xl border-2 p-3 transition-colors",
          styles[variant],
          className
        )}
      >
        {children}
        {/* {loading && <span>loading...</span>} */}
      </button>
    );
  }
);
