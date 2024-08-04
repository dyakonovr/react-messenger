import { useForm } from "react-hook-form";
import { languageChangeFormSchema, type LanguageChangeFormSchemaType } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "@/src/utils/navigation";

export const useSettingsAppearanceLanguageForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { register, handleSubmit } = useForm<LanguageChangeFormSchemaType>({
    resolver: zodResolver(languageChangeFormSchema),
    defaultValues: {
      language: "ru"
    }
  });

  // Fuctions
  function onSubmit({ language }: LanguageChangeFormSchemaType) {
    router.replace(pathname, { locale: language });
  }
  // Fuctions END

  return { register, handleSubmit, onSubmit };
};
