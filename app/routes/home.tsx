import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import { LoginForm } from "~/components/forms/LoginForm";
import { RegisterForm } from "~/components/forms/RegisterForm";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Carepulse" }, { name: "description", content: "Welcome to Carepulse!" }];
}

export default function Home() {
  const [sp] = useSearchParams();
  const isRegister = sp.get("type") === "register";
  const { t } = useTranslation();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-124">
          <div className="mb-10">
            <LanguageSwitcher />
          </div>

          <img
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {isRegister ? <RegisterForm /> : <LoginForm />}

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © {t("indexPage.copyright", { year: new Date().getFullYear() })}
            </p>
            <Link to="/?admin=true" className="text-green-500">
              {t("indexPage.admin")}
            </Link>
          </div>
        </div>
      </section>

      <img
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
