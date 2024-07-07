"use client";

import { Button, Input, Typography } from "@/src/components/ui";
import { PagePaths } from "@/src/enums/PagePaths";
import Link from "next/link";
import { useLogin } from "./useLogin";

export function Login() {
  const { isLoading, register, handleSubmit, onSubmit } = useLogin();

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
