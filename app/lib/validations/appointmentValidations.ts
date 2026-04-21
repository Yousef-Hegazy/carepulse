import { z } from "zod";
import i18n from "../../../i18n";

const t = i18n.t;

export const NewAppointmentValidation = z.object({
    scheduleDate: z.date({ error: t("newAppointmentForm:newAppointmentForm.validation.scheduleDateRequired") }),
    scheduleTime: z
        .string({ error: t("newAppointmentForm:newAppointmentForm.validation.scheduleTimeRequired") })
        .min(1, { error: t("newAppointmentForm:newAppointmentForm.validation.scheduleTimeRequired") }),
    primaryPhysician: z
        .string({ error: t("newAppointmentForm:newAppointmentForm.validation.primaryPhysicianRequired") })
        .min(1, { error: t("newAppointmentForm:newAppointmentForm.validation.primaryPhysicianRequired") }),
    reason: z
        .string({ error: t("newAppointmentForm:newAppointmentForm.validation.reasonRequired") })
        .min(1, { error: t("newAppointmentForm:newAppointmentForm.validation.reasonRequired") }),
    notes: z.string().optional(),
});
