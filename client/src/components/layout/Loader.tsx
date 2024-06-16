import { Loader2 as LoaderIcon } from "lucide-react";
import { Typography } from "../ui";

export function ApplicationLoader() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[var(--main-color)]">
      <LoaderIcon className="size-20 animate-spin stroke-white" />
      <Typography variant="subtitle" className="text-white">
        Пожалуйста, подождите...
      </Typography>
    </div>
  );
}
