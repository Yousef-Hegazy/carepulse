import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zLoginRequest } from "../../../generated/zod.gen";
import { useAuthStore } from "../../../stores/authStore";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm<z.infer<typeof zLoginRequest>>({
    resolver: zodResolver(zLoginRequest),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log({ data });
      const newUser = data;

      if (newUser) {
        navigate(`/auth-success`);
      }
    },
    onError: (error) => {
      console.log({ error });
      // Handle error (e.g., show a notification)
    }
  });

  const onSubmit = (values: z.infer<typeof zLoginRequest>) => loginMutate(values);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />

        <SubmitButton isLoading={isPending}>Get Started</SubmitButton>
      </form>
    </FormProvider>
  );
};
