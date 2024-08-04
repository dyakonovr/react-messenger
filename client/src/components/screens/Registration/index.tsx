"use client";

import { Button, Input, Typography } from "@/src/components/ui";
import { PagePaths } from "@/src/enums/PagePaths";
import { useTranslations } from "next-intl";
import { Link } from "@/src/utils/navigation";
import { useRegistration } from "./useRegistration";

export default function Registration() {
  const t = useTranslations("screens.Registration");
  const { register, handleSubmit, onSubmit } = useRegistration();

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="title" tag="h1" className="mb-5 text-center">
        {t("title")}
      </Typography>

      <div className="flex flex-col gap-3">
        {/* Only unique nickname! */}
        <Input
          placeholder={t("nickname_input_placeholder")}
          {...register("nickname", { required: true })}
        />
        <Input
          placeholder={t("login_input_placeholder")}
          {...register("login", { required: true })}
        />
        <Input
          placeholder={t("password_input_placeholder")}
          {...register("password", { required: true })}
        />
      </div>

      <Button variant="contained" className="mt-5" type="submit">
        {t("submit_button")}
      </Button>
      <Link href={PagePaths.LOGIN} className="mx-auto mt-2 no-underline hover:underline">
        {t("go_to_login_button")}
      </Link>
    </form>
  );
}
