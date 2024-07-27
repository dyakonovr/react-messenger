import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { UpdateAccountDataFormSchemaType } from "../../constants";

export const useChangeAvatarInput = (defaultAvatar: string | null) => {
  const { watch, setValue } = useFormContext<UpdateAccountDataFormSchemaType>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultAvatar);
  const watchedFile = watch("avatar");

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Очистка URL для освобождения памяти
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedFile]);

  // Functions
  const setCurrentAvatar = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(defaultAvatar);
    setValue("avatar", undefined);
  }, [previewUrl, defaultAvatar, setPreviewUrl, setValue]);

  const deleteAvatar = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setValue("avatar", undefined);
  }, [previewUrl, defaultAvatar, setPreviewUrl, setValue]);
  // Functions END

  return { previewUrl, setCurrentAvatar, deleteAvatar };
};
