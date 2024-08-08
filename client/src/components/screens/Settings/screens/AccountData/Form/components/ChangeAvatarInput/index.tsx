import { Avatar, Button, Input, Typography } from "@/src/components/ui";
import type { IUser } from "@/src/types/features/user";
import type { Nullable } from "@/src/types/general/nullable";
import { forwardRef, type ComponentProps } from "react";
import { useChangeAvatarInput } from "./useChangeAvatarInput";
import type { FieldError } from "react-hook-form";
import { useTranslations } from "next-intl";

interface IProps extends ComponentProps<"input"> {
  user: Nullable<IUser>;
  error: FieldError | undefined;
}

export const SettingsPanelChangeAvatarInput = forwardRef<HTMLInputElement, IProps>(
  ({ user, error, ...props }, ref) => {
    const t = useTranslations("screens.Settings.Account_Data.avatar");
    const { previewUrl, setCurrentAvatar, deleteAvatar } = useChangeAvatarInput(
      user?.avatar ?? null
    );

    return (
      <div className="flex flex-col gap-2">
        <Typography tag="label" variant="regular">
          {t("label")}
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <Avatar
              alt="Avatar"
              nickname={user?.nickname || ""}
              src={previewUrl}
              isLocalImage={previewUrl ? previewUrl.includes("blob") : false}
            />
            <Input
              type="file"
              placeholder=""
              className="max-w-[500px] cursor-pointer !p-0"
              accept=".png,.jpg,.jpeg"
              ref={ref}
              {...props}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="contained" className="min-w-fit" onClick={setCurrentAvatar}>
              {t("reset_to_current_button")}
            </Button>
            <Button variant="contained" className="min-w-fit" onClick={deleteAvatar}>
              {t("delete_button")}
            </Button>
          </div>
        </div>
        {error && (
          <Typography tag="p" variant="regular">
            {error.message}
          </Typography>
        )}
      </div>
    );
  }
);
