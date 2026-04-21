import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { Button } from "~/components/ui/button";
import { Doctors } from "~/lib/constants";
import { formatDateTime } from "~/lib/utils";
import type { AppointmentResponse } from "../../generated";

const AppointmentSuccess = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("appointmentSuccessPage");

  const [sp] = useSearchParams();
  const appointment = sp.get("data") ? (JSON.parse(sp.get("data")!) as AppointmentResponse) : null;
  const doctor = appointment ? Doctors.find((doc) => doc.nameEn === appointment.primaryPhysician) : null;

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="mb-6 py-4">
        <LanguageSwitcher />
      </div>

      <div className="success-img">
        <Link to="/">
          <img
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt={t("appointmentSuccessPage.logoAlt")}
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <img src="/assets/gifs/success-1-loop.gif" height={300} width={280} alt="success" />
          <h2 className="header mb-6 max-w-150 text-center">
            {t("appointmentSuccessPage.headingBefore")}{" "}
            <span className="text-green-500">{t("appointmentSuccessPage.headingHighlight")}</span>{" "}
            {t("appointmentSuccessPage.headingAfter")}
          </h2>
          <p>{t("appointmentSuccessPage.subheading")} #{appointment?.id}</p>
        </section>

        <section className="request-details">
          <p>{t("appointmentSuccessPage.requestedDetails")}</p>
          <div className="flex items-center gap-3">
            <img src={doctor?.image!} alt="doctor" width={100} height={100} className="size-6" />
            <p className="whitespace-nowrap">
              {t("appointmentSuccessPage.doctorPrefix")} {language === "ar" ? doctor?.nameAr : doctor?.nameEn}
            </p>
          </div>
          <div className="flex gap-2">
            <img src="/assets/icons/calendar.svg" height={24} width={24} alt="calendar" />
            <p>{formatDateTime(appointment?.schedule)?.dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link to="/appointments/new">{t("appointmentSuccessPage.newAppointment")}</Link>
        </Button>

        <p className="copyright">{t("appointmentSuccessPage.copyright", { year: String(new Date().getFullYear()) })}</p>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
