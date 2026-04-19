"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { SelectItem } from "~/components/ui/select";
import { Doctors, IdentificationTypes } from "~/lib/constants";

import { useMutation } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router";
import { NewPatientValidation } from "~/lib/validations/patientValidations";
import { postApiPatients, type PostApiPatientsData } from "../../../generated";
import { zGender } from "../../../generated/zod.gen";
import { useAuthStore } from "../../../stores/authStore";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { Field } from "../ui/field";
import { toastManager } from "../ui/toast";

type PatientFormValues = z.infer<typeof NewPatientValidation>;

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setProfile = useAuthStore((s) => s.setProfile);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(NewPatientValidation),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await postApiPatients({
        body: data as PostApiPatientsData["body"],
      });

      if (res.error || !res.data) {
        throw res.error;
      }

      return res.data;
    },
    onSuccess: (data) => {
      setProfile(data);
      navigate("/new-appointment");
    },
    onError: (err) => {
      console.log("Error submitting form:", err);
      toastManager.add({
        type: "error",
        title:
          err.message ||
          (err as any)?.title ||
          (err as any)?.detail ||
          "An error occurred while submitting the form. Please try again.",
      });
    },
  });

  const onSubmit = async (values: PatientFormValues) => {
    const formData = new FormData();

    for (const [key, val] of Object.entries(values)) {
      if (!val) continue;

      if (Array.isArray(val) && val.every((item) => item instanceof File)) {
        formData.append(key, new Blob([val[0]], { type: val[0].type }));
        continue;
      }

      formData.append(key, String(val));
    }

    mutate(formData);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
          <h1 className="header">{t("patientRegisterPage.welcome")} 👋</h1>
          <p className="text-dark-700">{t("patientRegisterPage.subtitle")}</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("registerPatientForm.steps.personalInfo.title")}</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="FullName"
            label={t("registerPatientForm.fields.fullName")}
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            {/* <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            /> */}

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="PhoneNumber"
              label={t("registerPatientForm.fields.phoneNumber")}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="BirthDate"
              label={t("registerPatientForm.fields.dateOfBirth")}
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="Gender"
              label={t("registerPatientForm.fields.gender")}
              renderSkeleton={(field) => (
                <Field>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {Object.values(zGender.enum).map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </Field>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="Address"
              label={t("registerPatientForm.fields.address")}
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="Occupation"
              label={t("registerPatientForm.fields.occupation")}
              placeholder="Software Engineer"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="EmergencyContactName"
              label={t("registerPatientForm.fields.emergencyContactName")}
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="EmergencyContactNumber"
              label={t("registerPatientForm.fields.emergencyContactPhone")}
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("registerPatientForm.steps.medicalInfo.title")}</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="PrimaryPhysicianName"
            label={t("registerPatientForm.fields.primaryCarePhysician")}
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <img
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="InsuranceProvider"
              label={t("registerPatientForm.fields.insuranceProvider")}
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="InsurancePolicyNumber"
              label={t("registerPatientForm.fields.insurancePolicyNumber")}
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="Allergies"
              label={t("registerPatientForm.fields.allergies")}
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="CurrentMedication"
              label={t("registerPatientForm.fields.currentMedication")}
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="FamilyMedicalHistory"
              label={t("registerPatientForm.fields.familyMedicalHistory")}
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="PastMedicalHistory"
              label={t("registerPatientForm.fields.pastMedicalHistory")}
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("registerPatientForm.steps.identification.title")}</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="IdentificationType"
            label={t("registerPatientForm.fields.identificationType")}
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="IdentificationNumber"
            label={t("registerPatientForm.fields.identificationNumber")}
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="IdentificationDocument"
            label={t("registerPatientForm.fields.scannedIdentification")}
            renderSkeleton={(field) => (
              <Field>
                <FileUploader files={field.value} onChange={field.onChange} />
              </Field>
            )}
          />
        </section>

        {/* <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("registerPatientForm.rivacyConsent")}</h2>
          </div> */}

        {/* <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="TreatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="DisclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          /> */}

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="PrivacyConsent"
          label={t("registerPatientForm.fields.privacyConsent")}
        />
        {/* </section> */}

        <SubmitButton isLoading={isPending}>{t("registerPatientForm.actions.submit")}</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
