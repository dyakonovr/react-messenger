"use client";

import { Button, Input, Typography } from "@/src/components/ui";
import { PagePaths } from "@/src/enums/PagePaths";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { LoginFormSchemaType } from "./constants";
import { loginFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/src/services/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/stores/user";
import { useState } from "react";

export function Login() {
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
      setUser(response);
      router.replace(PagePaths.HOME);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  // Fuctions END

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="title" tag="h1" className="mb-5 text-center">
        Login
      </Typography>

      <div className="flex flex-col gap-3">
        <Input
          placeholder="Enter your login"
          {...register("login", { required: true })}
        />
        <Input
          placeholder="Enter your password"
          type="password"
          {...register("password", { required: true })}
        />
      </div>

      <Button variant="contained" loading={isLoading} className="mt-5" type="submit">
        Sign in
      </Button>
      <Link
        href={PagePaths.REGISTRATION}
        className="mx-auto mt-2 no-underline hover:underline"
      >
        Go to registration
      </Link>
    </form>
  );
}

export default Login;
