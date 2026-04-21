import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Doctors } from "~/lib/constants";
import { NewAppointmentValidation } from "~/lib/validations/appointmentValidations";
import { postApiAppointments } from "../../../generated";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";
import { toastManager } from "../ui/toast";

type AppointmentFormValues = z.infer<typeof NewAppointmentValidation>;

const NewAppointmentForm = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("newAppointmentForm");
  const navigate = useNavigate();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(NewAppointmentValidation),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: Parameters<typeof postApiAppointments>[0]["body"]) =>
      postApiAppointments({ body, throwOnError: true }),
    onSuccess: (res) => {
      toastManager.add({
        type: "success",
        title: t("newAppointmentForm.notifications.submitSuccess"),
      });
      navigate("/appointment-success", { state: res.data });
    },
    onError: (err) => {
      toastManager.add({
        type: "error",
        title: (err as any)?.detail || t("newAppointmentForm.notifications.submitError"),
      });
    },
  });

  const onSubmit = (values: AppointmentFormValues) => {
    const dateStr = values.scheduleDate.toISOString().split("T")[0];
    const [hours, minutes] = values.scheduleTime.split(":");

    mutate({
      schedule: `${dateStr}T${hours}:${minutes}:00.000Z`,
      primaryPhysician: values.primaryPhysician,
      reason: values.reason,
      notes: values.notes,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {/* Date & Time */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="scheduleDate"
            label={t("newAppointmentForm.fields.scheduleDate")}
            onlyFuture
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="scheduleTime"
            label={t("newAppointmentForm.fields.scheduleTime")}
            type="time"
          />
        </div>

        {/* Primary Physician */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label={t("newAppointmentForm.fields.primaryPhysician")}
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.nameEn + i} value={doctor.nameEn}>
              <div className="flex cursor-pointer items-center gap-2">
                <img
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{language === "ar" ? doctor.nameAr : doctor.nameEn}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        {/* Reason & Notes */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label={t("newAppointmentForm.fields.reason")}
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="notes"
            label={t("newAppointmentForm.fields.notes")}
          />
        </div>

        <SubmitButton isLoading={isPending}>{t("newAppointmentForm.actions.submit")}</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default NewAppointmentForm;
