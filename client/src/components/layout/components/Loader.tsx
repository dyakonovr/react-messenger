import { useTranslations } from "next-intl";
import { LoaderSpin, Typography } from "../../ui";

export function ApplicationLoader() {
  const t = useTranslations("screens.ApplicationLoader");

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[var(--main-color)] transition-colors">
      <LoaderSpin size="l" className="stroke-white" />
      <Typography variant="subtitle" className="max-w-[600px] text-center text-white">
        {t("text")}
      </Typography>
    </div>
  );
}
