import { Button, Typography } from "@/src/components/ui";
import { SettingsAppearanceLanguageFormItem } from "./Item";
import { useSettingsAppearanceLanguageForm } from "./useSettingsAppearanceLanguageForm";
import { useTranslations } from "next-intl";

export function SettingsAppearanceLanguageForm() {
  const t = useTranslations("screens.Settings.Appearance.Language");
  const { register, handleSubmit, onSubmit } = useSettingsAppearanceLanguageForm();

  return (
    <>
      <Typography variant="regular" tag="p" className="mb-3">
        {t("pick_language_label")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-10 gap-5">
          <SettingsAppearanceLanguageFormItem
            label="Русский"
            value="ru"
            {...register("language")}
          />
          <SettingsAppearanceLanguageFormItem
            label="English"
            value="en"
            {...register("language")}
          />
        </div>
        <Button type="submit" variant="contained" className="mt-5">
          {t("update_language_button")}
        </Button>
      </form>
    </>
  );
}
