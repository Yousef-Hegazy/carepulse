import { z } from "zod";
import i18n from "../../../i18n";
import { zGender } from "../../../generated/zod.gen";

const t = i18n.t;

export const NewPatientValidation = z.object({
    FullName: z.string({ error: t('registerPatientForm.validation.nameRequired') }).min(1, {
        error: t('registerPatientForm.validation.nameRequired'),
    }),
    PhoneNumber: z.string({ error: t('registerPatientForm.validation.phoneRequired') }).min(1, {
        error: t('registerPatientForm.validation.phoneRequired'),
    }),
    BirthDate: z.any().refine((value) => !isNaN(Date.parse(value)), {
        error: t('registerPatientForm.validation.birthDateRequired'),
    }),
    Gender: z.string({ error: t('registerPatientForm.validation.genderRequired') }).refine((value) =>
        Object.values(zGender.enum).includes(value as any),
        {
            error: t('registerPatientForm.validation.genderRequired'),
        }),
    Address: z.string({ error: t('registerPatientForm.validation.addressRequired') }).min(1, {
        error: t('registerPatientForm.validation.addressRequired'),
    }),
    Occupation: z.string({ error: t('registerPatientForm.validation.occupationRequired') }).min(1, {
        error: t('registerPatientForm.validation.occupationRequired'),
    }),
    EmergencyContactName: z.string({
        error: t('registerPatientForm.validation.emergencyContactNameRequired'),
    }).min(1, {
        error: t('registerPatientForm.validation.emergencyContactNameRequired'),
    }),
    EmergencyContactNumber: z.string({
        error: t('registerPatientForm.validation.emergencyContactPhoneRequired'),
    }).min(1, {
        error: t('registerPatientForm.validation.emergencyContactPhoneRequired'),
    }),
    PrimaryPhysicianName: z.string({
        error: t('registerPatientForm.validation.primaryCarePhysicianRequired'),
    }).min(1, {
        error: t('registerPatientForm.validation.primaryCarePhysicianRequired'),
    }),
    InsuranceProvider: z.string({
        error: t('registerPatientForm.validation.insuranceProviderRequired'),
    }).min(1, {
        error: t('registerPatientForm.validation.insuranceProviderRequired'),
    }),
    InsurancePolicyNumber: z.string({
        error: t('registerPatientForm.validation.insurancePolicyNumberRequired'),
    }).min(1, {
        error: t('registerPatientForm.validation.insurancePolicyNumberRequired'),
    }),
    // Optional fields
    Allergies: z.string().optional(),
    CurrentMedication: z.string().optional(),
    FamilyMedicalHistory: z.string().optional(),
    PastMedicalHistory: z.string().optional(),
    // Identification
    IdentificationType: z.string({
        error: t('registerPatientForm.validation.identificationTypeRequired'),
    }).min(1, {
        error: t('registerPatientForm.validation.identificationTypeRequired'),
    }),
    IdentificationNumber: z.string({
        error: t('registerPatientForm.validation.identificationNumberRequired'),
    }).min(1, {
        error: t('registerPatientForm.validation.identificationNumberRequired'),
    }),
    IdentificationDocument: z.array(z.instanceof(File), {
        error: t('registerPatientForm.validation.scannedIdentificationRequired'),
    }).min(1, { error: t('registerPatientForm.validation.scannedIdentificationRequired') }),
    // Privacy consent
    PrivacyConsent: z.boolean({
        error: t('registerPatientForm.validation.privacyConsentRequired'),
    }).refine((val) => val === true, {
        error: t('registerPatientForm.validation.privacyConsentRequired'),
    }),
});
