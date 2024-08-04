"use client";

import { useUserStore } from "@/src/stores/useUserStore";
import { useForm } from "react-hook-form";
import {
  updateAccountDataFormSchema,
  type UpdateAccountDataFormSchemaType
} from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import UserService from "@/src/services/user";
import { deleteEmptyFieldsInObject } from "@/src/utils/deleteEmptyFieldsInObject";
import toast from "react-hot-toast";
import { fetchDataErrorToast } from "@/src/utils/fetchDataErrorToast";

export const useSettingsAccountData = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const formMethods = useForm<UpdateAccountDataFormSchemaType>({
    resolver: zodResolver(updateAccountDataFormSchema),
    defaultValues: {
      nickname: user?.nickname
    }
  });

  // Fuctions
  async function onSubmit(data: UpdateAccountDataFormSchemaType) {
    try {
      const result = deleteEmptyFieldsInObject(data);
      if (Object.keys(result).length === 0) return;

      if (
        (result.oldPassword && !result.newPassword) ||
        (!result.oldPassword && result.newPassword)
      ) {
        throw new Error("For change password you should enter old and new passwords");
      }

      setIsButtonLoading(true);

      const { avatar, ...restData } = result;
      const formData = new FormData();

      if (avatar && avatar[0]) formData.append("file", avatar[0]);
      Object.keys(restData).map((key) =>
        formData.append(key, restData[key as keyof typeof restData])
      );

      const response = await UserService.update(formData);

      if (response.error !== null) {
        return fetchDataErrorToast(response.error);
      }

      if (response.data === null) throw new Error("Unexpected error");

      setUser(response.data);
      formMethods.reset({
        newPassword: "",
        oldPassword: "",
        nickname: response.data.nickname,
        login: ""
      });

      toast.success("Successful account data update!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsButtonLoading(false);
    }
  }
  // Fuctions END

  return {
    user,
    onSubmit,
    formMethods,
    isButtonLoading
  };
};
