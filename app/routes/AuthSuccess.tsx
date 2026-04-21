import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { Spinner } from "~/components/ui/spinner";
import { getProfileQuery } from "~/lib/queries/authQueries";
import { useAuthStore } from "../../stores/authStore";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const { t } = useTranslation("oauthSuccess");
  const auth = useAuthStore((state) => state.auth);
  const setProfile = useAuthStore((state) => state.setProfile);

  const type = (sp.get("type") || "patient") as "patient" | "admin" | "doctor";

  const { data, error, isSuccess, isError, isFetching } = getProfileQuery({ type, enabled: !!auth?.accessToken });

  useEffect(() => {
    if (isFetching) return;
    if (isSuccess && data?.id) {
      setProfile(data);
      navigate("/appointments/new", { replace: true });
    } else if (isError && (error as any)?.status === 404) {
      console.log(error)
      setProfile(null);
      
      if (type === "patient") {
        navigate("/new-patient", { replace: true });
      }
    } else {
      setProfile(null);
      navigate("/", { replace: true });
    }
  }, [isSuccess, isError, data, setProfile, navigate, type]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 h-screen w-full">
      <p className="text-lg">{t("redirectMessage")}</p>
      {isFetching ? <Spinner className="size-8" /> : isError ? <p className="text-red-500">{error.message}</p> : null}
    </div>
  );
};

export default AuthSuccess;
