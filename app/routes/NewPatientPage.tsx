import { useTranslation } from "react-i18next";
import NewPatientForm from "~/components/forms/NewPatientForm";
import LanguageSwitcher from "~/components/LanguageSwitcher";

const NewPatientPage = () => {
  const { t } = useTranslation("patientRegisterPage");
  const { t: ct } = useTranslation("common");

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-215 flex-1 flex-col py-10">
          <div className="mb-10">
            <LanguageSwitcher />
          </div>

          <img
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt={t("patientRegisterPage.logoAlt")}
            className="mb-12 h-10 w-fit"
          />

          <NewPatientForm />

          <p className="copyright py-12">{ct("indexPage.copyright", { year: String(new Date().getFullYear()) })}</p>
        </div>
      </section>

      <img
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt={t("patientRegisterPage.registerImageAlt")}
        className="side-img max-w-97.5"
      />
    </div>
  );
};

export default NewPatientPage;
