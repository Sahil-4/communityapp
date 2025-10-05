"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH1 } from "@/components/ui/typography";

interface IFormInput {
  username: string;
  name: string;
  phone: string;
  password: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isValid },
  } = useForm<IFormInput>();

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(isValid);
    console.log(data);
  };

  const navigateToLogin = () => {
    router.push("/auth/login");
  };

  const inputFeilds = [
    {
      type: "text",
      placeholder: "Username",
      name: "username",
      options: { maxLength: 12, minLength: 6, disabled: false, required: true },
    },
    {
      type: "text",
      placeholder: "Name",
      name: "name",
      options: { maxLength: 12, minLength: 3, disabled: false, required: true },
    },
    {
      type: "tel",
      placeholder: "Phone",
      name: "phone",
      options: { maxLength: 18, minLength: 6, disabled: false, required: true },
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
      options: { maxLength: 32, minLength: 8, disabled: false, required: true },
    },
  ] as const;

  console.log(errors);

  if (isLoading) return <Spinner />;
  return (
    <main className="w-full scroll-auto">
      <form
        className="w-[420px] mx-auto my-8 py-4"
        onSubmit={handleSubmit(onSubmit)}>
        <TypographyH1 className="m-8">Create new account</TypographyH1>

        {inputFeilds.map((feild) => (
          <Input
            key={feild.name}
            className="w-96 block mx-auto my-2"
            type={feild.type}
            placeholder={feild.placeholder}
            {...register(feild.name, feild.options)}
          />
        ))}

        <Button className="w-96 block mx-auto my-2" type="submit">
          Signup
        </Button>

        <Button
          onClick={navigateToLogin}
          variant={"link"}
          className="w-96 block mx-auto my-2"
          type="button">
          Login here
        </Button>
      </form>
    </main>
  );
};

export default Page;
