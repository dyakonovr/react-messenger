"use client";

import { Button } from "@/src/components/ui";
import { SettingsPanelInput, SettingsPanelChangeAvatarInput } from "./components";
import { useSettingsAccountData } from "./useSettingsAccountData";
import { FormProvider } from "react-hook-form";

function SettingsAccountDataForm() {
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
            label="Nickname"
            defaultValue={user?.nickname}
            error={errors["nickname"]}
            {...formMethods.register("nickname")}
          />
          <SettingsPanelInput
            label="Login"
            error={errors["login"]}
            {...formMethods.register("login")}
          />
          <SettingsPanelInput
            label="Enter old password"
            error={errors["oldPassword"]}
            type="password"
            {...formMethods.register("oldPassword")}
          />
          <SettingsPanelInput
            label="Enter new password"
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
          Update data
        </Button>
      </form>
    </FormProvider>
  );
}

export default SettingsAccountDataForm;
