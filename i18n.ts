import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './locales/en/common';
import registerPatientFormEn from './locales/en/registerPatientForm';
import patientRegisterPageEn from './locales/en/patientRegisterPage';
import newAppointmentFormEn from './locales/en/newAppointmentForm';

import commonAr from './locales/ar/common';
import registerPatientFormAr from './locales/ar/registerPatientForm';
import patientRegisterPageAr from './locales/ar/patientRegisterPage';
import newAppointmentFormAr from './locales/ar/newAppointmentForm';

const resources = {
  en: {
    common: commonEn,
    registerPatientForm: registerPatientFormEn,
    patientRegisterPage: patientRegisterPageEn,
    newAppointmentForm: newAppointmentFormEn,
    oauthSuccess: commonEn.oauthSuccess
  },
  ar: {
    common: commonAr,
    registerPatientForm: registerPatientFormAr,
    patientRegisterPage: patientRegisterPageAr,
    newAppointmentForm: newAppointmentFormAr,
    oauthSuccess: commonAr.oauthSuccess
  }
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: [
      'common',
      'registerPatientForm',
      'patientRegisterPage',
      'newAppointmentForm',
      'oauthSuccess'
    ],
    defaultNS: 'common',
    fallbackNS: [
      'common',
      'registerPatientForm',
      'patientRegisterPage',
      'newAppointmentForm',
      'oauthSuccess'
    ],
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
