"use client";

import { Button, Input, Typography } from "@/src/components/ui";
import { PagePaths } from "@/src/enums/PagePaths";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { RegistrationFormSchemaType } from "./constants";
import { registrationFormSchema } from "./constants";
import { useForm } from "react-hook-form";
import AuthService from "@/src/services/auth";
import { useUserStore } from "@/src/stores/useUserStore";

export default function Registration() {
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
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  }
  // Fuctions END

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="title" tag="h1" className="mb-5 text-center">
        Registration
      </Typography>

      <div className="flex flex-col gap-3">
        {/* Only unique nickname! */}
        <Input
          placeholder="Enter your nickname"
          {...register("nickname", { required: true })}
        />
        <Input
          placeholder="Enter your login"
          {...register("login", { required: true })}
        />
        <Input
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
      </div>

      <Button variant="contained" className="mt-5" type="submit">
        Sign up
      </Button>
      <Link href={PagePaths.LOGIN} className="mx-auto mt-2 no-underline hover:underline">
        Go to login
      </Link>
    </form>
  );
}
