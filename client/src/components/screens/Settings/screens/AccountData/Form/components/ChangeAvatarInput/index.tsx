import { Avatar, Button, Input, Typography } from "@/src/components/ui";
import type { IUser } from "@/src/types/features/user";
import type { Nullable } from "@/src/types/general/nullable";
import { forwardRef, type ComponentProps } from "react";
import { useChangeAvatarInput } from "./useChangeAvatarInput";
import type { FieldError } from "react-hook-form";

interface IProps extends ComponentProps<"input"> {
  user: Nullable<IUser>;
  error: FieldError | undefined;
}

export const SettingsPanelChangeAvatarInput = forwardRef<HTMLInputElement, IProps>(
  ({ user, error, ...props }, ref) => {
    const { previewUrl, setCurrentAvatar, deleteAvatar } = useChangeAvatarInput(
      user?.avatar ?? null
    );

    return (
      <div className="flex flex-col gap-2">
        <Typography tag="label" variant="regular">
          Avatar
        </Typography>
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
            className="cursor-pointer !p-0"
            accept=".png,.jpg,.jpeg"
            ref={ref}
            {...props}
          />
          <Button variant="contained" className="min-w-fit" onClick={setCurrentAvatar}>
            Reset to current
          </Button>
          <Button variant="contained" className="min-w-fit" onClick={deleteAvatar}>
            Delete
          </Button>
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
