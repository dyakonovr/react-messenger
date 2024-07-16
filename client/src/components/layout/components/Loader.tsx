import { Loader2 as LoaderIcon } from "lucide-react";
import { Typography } from "../../ui";

export function ApplicationLoader() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[var(--main-color)] transition-colors">
      <LoaderIcon className="size-20 animate-spin stroke-white" />
      <Typography variant="subtitle" className="max-w-[600px] text-center text-white">
        Пожалуйста, подождите. Мы вспоминаем, кто вы, устанавливаем ваши настройки...
      </Typography>
    </div>
  );
}
