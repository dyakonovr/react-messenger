import { zodResolver } from "@hookform/resolvers/zod";
import type { RegistrationFormSchemaType } from "./constants";
import { registrationFormSchema } from "./constants";
import { useForm } from "react-hook-form";
import AuthService from "@/src/services/auth";
import { useUserStore } from "@/src/stores/useUserStore";
import { fetchDataErrorToast } from "@/src/utils/fetchDataErrorToast";

export const useRegistration = () => {
  const setUser = useUserStore((state) => state.setUser);
  const { register, handleSubmit } = useForm<RegistrationFormSchemaType>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      login: "",
      password: "",
      nickname: ""
    }
  });

  // Fuctions
  async function onSubmit(data: RegistrationFormSchemaType) {
    try {
      const response = await AuthService.registration(data);

      if (response.error !== null) {
        return fetchDataErrorToast(response.error);
      }

      if (response.data === null) throw new Error("Unexpected error");

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // Fuctions END

  return { register, handleSubmit, onSubmit };
};
