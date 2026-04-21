import { useTranslation } from "react-i18next";
import NewAppointmentForm from "~/components/forms/NewAppointmentForm";
import LanguageSwitcher from "~/components/LanguageSwitcher";

export default function NewAppointment() {
  const { t } = useTranslation("newAppointmentForm");
  const { t: ct } = useTranslation("common");

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-200 flex-1 flex-col py-10">
          <div className="mb-10">
            <LanguageSwitcher />
          </div>

          <img
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="CarePulse Logo"
            className="mb-12 h-10 w-fit"
          />

          <section className="mb-12 space-y-4">
            <h1 className="header">{t("newAppointmentForm.title")}</h1>
            <p className="text-dark-700">{t("newAppointmentForm.subtitle")}</p>
          </section>

          <NewAppointmentForm />

          <p className="copyright py-12">
            {ct("indexPage.copyright", { year: String(new Date().getFullYear()) })}
          </p>
        </div>
      </section>

      <img
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-72"
      />
    </div>
  );
}
