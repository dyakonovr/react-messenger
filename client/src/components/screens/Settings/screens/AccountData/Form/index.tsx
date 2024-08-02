"use client";

import { Button } from "@/src/components/ui";
import { SettingsPanelInput, SettingsPanelChangeAvatarInput } from "./components";
import { useSettingsAccountData } from "./useSettingsAccountData";
import { FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";

function SettingsAccountDataForm() {
  const t = useTranslations("screens.Settings.Account_Data");
  const { user, onSubmit, formMethods, isButtonLoading } = useSettingsAccountData();
  const errors = formMethods.formState.errors;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-5"
      >
        <div className="grid grid-cols-2 gap-5">
          <SettingsPanelInput
            label={t("nickname_input_label")}
            defaultValue={user?.nickname}
            error={errors["nickname"]}
            {...formMethods.register("nickname")}
          />
          <SettingsPanelInput
            label={t("login_input_label")}
            error={errors["login"]}
            {...formMethods.register("login")}
          />
          <SettingsPanelInput
            label={t("old_password_input_label")}
            error={errors["oldPassword"]}
            type="password"
            {...formMethods.register("oldPassword")}
          />
          <SettingsPanelInput
            label={t("new_password_input_label")}
            error={errors["newPassword"]}
            type="password"
            {...formMethods.register("newPassword", { required: false })}
          />
        </div>
        <SettingsPanelChangeAvatarInput
          user={user}
          error={errors["avatar"]}
          {...formMethods.register("avatar", { required: false })}
        />
        <Button
          variant="contained"
          className="w-fit"
          loading={isButtonLoading}
          type="submit"
        >
          {t("update_data_button")}
        </Button>
      </form>
    </FormProvider>
  );
}

export default SettingsAccountDataForm;
