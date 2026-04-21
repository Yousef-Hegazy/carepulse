import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useAuthStore } from "../../../stores/authStore";
import { LoginValidation } from "../../lib/validations/authValidations";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Button } from "../ui/button";
import { Field, FieldContent, FieldLabel, FieldTitle } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toastManager } from "../ui/toast";

type LoginForm = z.infer<typeof LoginValidation>;

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        navigate(`/auth-success?type=patient`);
      }
    },
    onError: (error) => {
      console.log({ error });
      toastManager.add({
        title: (error as any).title?.toString() || (error as any).message?.toString() || t("auth.loginError"),
        description: (error as any).detail?.toString(),
        type: "error",
      });
    },
  });

  const onSubmit = (values: LoginForm) => loginMutate(values);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">{t("patientForm.title")} 👋</h1>
          <p className="text-dark-700">{t("patientForm.patientSubtitle")}</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label={t("auth.email")}
          placeholder="johndoe@gmail.com"
          icon={<Mail className="size-5" />}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label={t("auth.password")}
          placeholder="******"
          icon={<Lock className="size-5" />}
          type={showPassword ? "text" : "password"}
          endIcon={
            <Button size="icon-sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeClosed /> : <Eye />}
            </Button>
          }
        />

        <RadioGroup
          role="radiogroup"
          orientation="horizontal"
          className="grid grid-cols-2 gap-2"
          defaultValue="patient"
        >
          <FieldLabel htmlFor="patient">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{t("patientForm.patient")}</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="patient" id="patient" />
            </Field>
          </FieldLabel>

          <Tooltip>
            <TooltipTrigger asChild>
              <FieldLabel htmlFor="doctor">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{t("patientForm.doctor")}</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem disabled value="doctor" id="doctor" />
                </Field>
              </FieldLabel>
            </TooltipTrigger>
            <TooltipContent>{t("patientForm.doctorDisabledMessage")}</TooltipContent>
          </Tooltip>
        </RadioGroup>

        <SubmitButton isLoading={isPending}>
          <LogIn />
          {t("auth.login")}
        </SubmitButton>

        <p className="text-sm text-neutral-300">
          {t("auth.dontHaveAnAccount")}{" "}
          <Button asChild variant="link" size="sm" className="px-0">
            <Link to="?type=register">{t("auth.register")}</Link>
          </Button>
        </p>
      </form>
    </FormProvider>
  );
};
