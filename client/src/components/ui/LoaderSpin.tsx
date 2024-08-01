import clsx from "clsx";
import { Loader2 as LoaderIcon } from "lucide-react";

type ISize = "xs" | "s" | "m" | "l";
interface IProps {
  className?: string;
  rootClassName?: string;
  size?: ISize;
}

const styles: Record<ISize, string> = {
  xs: "size-6",
  s: "size-10",
  m: "size-16",
  l: "size-20"
};

export const LoaderSpin: React.FC<IProps> = ({ className, rootClassName, size }) => {
  return (
    <div className={rootClassName}>
      <LoaderIcon
        className={clsx(
          size ? styles[size] : "",
          "animate-spin stroke-[var(--main-color)]",
          className
        )}
      />
    </div>
  );
};
