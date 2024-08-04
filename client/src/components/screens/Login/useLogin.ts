import { useForm } from "react-hook-form";
import type { LoginFormSchemaType } from "./constants";
import { loginFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/src/services/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/stores/useUserStore";
import { useState } from "react";
import { PagePaths } from "@/src/enums/PagePaths";
import toast from "react-hot-toast";
import { fetchDataErrorToast } from "@/src/utils/fetchDataErrorToast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { register, handleSubmit } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: "",
      password: ""
    }
  });

  // Fuctions
  async function onSubmit(data: LoginFormSchemaType) {
    try {
      setIsLoading(true);
      const response = await AuthService.login(data);

      if (response.error !== null) {
        return fetchDataErrorToast(response.error);
      }

      if (response.data === null) throw new Error("Unexpected error");

      setUser(response.data);
      router.replace(PagePaths.HOME);
    } catch (error) {
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  }
  // Fuctions END

  return { isLoading, register, handleSubmit, onSubmit };
};
