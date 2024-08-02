"use client";

import { Button, Input, Typography } from "@/src/components/ui";
import { PagePaths } from "@/src/enums/PagePaths";
import { useLogin } from "./useLogin";
import { useTranslations } from "next-intl";
import { Link } from "@/src/utils/navigation";

export function Login() {
  const { isLoading, register, handleSubmit, onSubmit } = useLogin();
  const t = useTranslations("screens.Login");

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="title" tag="h1" className="mb-5 text-center">
        {t("title")}
      </Typography>

      <div className="flex flex-col gap-3">
        <Input
          placeholder={t("login_input_placeholder")}
          {...register("login", { required: true })}
        />
        <Input
          placeholder={t("password_input_placeholder")}
          type="password"
          {...register("password", { required: true })}
        />
      </div>

      <Button variant="contained" loading={isLoading} className="mt-5" type="submit">
        {t("submit_button")}
      </Button>
      <Link
        href={PagePaths.REGISTRATION}
        className="mx-auto mt-2 no-underline hover:underline"
      >
        {t("go_to_registration_button")}
      </Link>
    </form>
  );
}

export default Login;
