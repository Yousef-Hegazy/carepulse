import z from "zod";
import i18n from "../../../i18n";

const t = i18n.t

export const RegisterValidation = z.object({
    email: z.email({ message: t('auth.emailInvalid') }).min(3, { message: t('auth.emailRequired') }),
    password: z.string()
        .min(6, { message: t('auth.passwordMinError') })
        .regex(/[A-Z]/, { message: t('auth.passwordUppercaseError') })
        .regex(/[a-z]/, { message: t('auth.passwordLowercaseError') })
        .regex(/[0-9]/, { message: t('auth.passwordNumberError') })
        .regex(/[^A-Za-z0-9]/, { message: t('auth.passwordSpecialError') }),
});

export const LoginValidation = z.object({
    email: z.email({ message: t('auth.emailInvalid') }).min(3, { message: t('auth.emailRequired') }),
    password: z.string().min(6, { message: t('auth.passwordMinError') }),
});