// import the original type declarations
import "i18next";
import commonEn from "./locales/en/common";
import registerPatientFormEn from "./locales/en/registerPatientForm";
import patientRegisterPageEn from "./locales/en/patientRegisterPage";
import newAppointmentFormEn from "./locales/en/newAppointmentForm";
import appointmentSuccessPageEn from "./locales/en/appointmentSuccessPage";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof commonEn;
      registerPatientForm: typeof registerPatientFormEn;
      patientRegisterPage: typeof patientRegisterPageEn;
      newAppointmentForm: typeof newAppointmentFormEn;
      appointmentSuccessPage: typeof appointmentSuccessPageEn;
      oauthSuccess: typeof commonEn["oauthSuccess"];
    };
  }
}
