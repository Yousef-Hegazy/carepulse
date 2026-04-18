import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { Spinner } from "~/components/ui/spinner";
import { getProfileQuery } from "~/lib/queries/authQueries";
import { useAuthStore } from "../../stores/authStore";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const { t } = useTranslation();
  const auth = useAuthStore((state) => state.auth);
  const setProfile = useAuthStore((state) => state.setProfile);

  const type = sp.get("type") as "patient" | "admin" | "doctor";

  const { data, error, isSuccess, isError, isFetching } = getProfileQuery({ type, enabled: !!auth?.accessToken });

  useEffect(() => {
    if (isSuccess && data?.id) {
      setProfile(data);
      navigate("/new-appointment");
    } else if (isError) {
      navigate("/");
    }
  }, [isSuccess, isError, data, setProfile, navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 h-screen w-full">
      <p className="text-lg">{t("oauthSuccess.redirectMessage")}</p>
      {isFetching ? <Spinner className="size-8" /> : isError ? <p className="text-red-500">{error.message}</p> : null}
    </div>
  );
};

export default AuthSuccess;
