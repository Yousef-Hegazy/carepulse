import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed, Lock, UserPlus2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useAuthStore } from "../../../stores/authStore";
import { RegisterValidation } from "../../lib/validations/authValidations";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Button } from "../ui/button";
import { Field, FieldContent, FieldLabel, FieldTitle } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toastManager } from "../ui/toast";

type RegisterForm = z.infer<typeof RegisterValidation>;

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const register = useAuthStore((state) => state.register);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: registerMutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log({ data });
      const newUser = data;

      if (newUser) {
        navigate(`/auth-success?type=patient`);
      }
    },
    onError: (error) => {
      console.log({ error });
      toastManager.add({
        title: (error as any)?.title || (error as any)?.message || t("auth.registerError"),
        description: (error as any).detail?.toString(),
        type: "error",
      });
    },
  });

  const onSubmit = (values: RegisterForm) => registerMutate(values);

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
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
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
          <UserPlus2 />
          {t("auth.register")}
        </SubmitButton>

        <p className="text-sm text-neutral-300">
          {t("auth.alreadyHaveAnAccount")}{" "}
          <Button asChild variant="link" size="sm" className="px-0">
            <Link to="?type=login">{t("auth.login")}</Link>
          </Button>
        </p>
      </form>
    </FormProvider>
  );
};
