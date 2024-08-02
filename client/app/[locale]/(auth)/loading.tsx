import { Typography } from "@/src/components/ui";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");
  return (
    <Typography tag="h1" variant="title">
      {t("loading")}
    </Typography>
  );
}
