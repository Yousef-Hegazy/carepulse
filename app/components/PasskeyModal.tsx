import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/components/ui/input-otp";
import { getApiCarePulseAuthIsAdmin } from "../../generated";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface PasskeyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PasskeyModal = ({ open, setOpen }: PasskeyModalProps) => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const { t } = useTranslation("common");
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const { mutate: validatePasskey, isPending } = useMutation({
    mutationFn: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (passkey === import.meta.env.VITE_ADMIN_PASSKEY) {
        const auth = await login({
          email: import.meta.env.VITE_ADMIN_EMAIL!,
          password: import.meta.env.VITE_ADMIN_PASSWORD!,
        });

        const isAdmin = await getApiCarePulseAuthIsAdmin({
          throwOnError: true,
        });

        return { auth, isAdmin: isAdmin.data };
      } else {
        setError(t("indexPage.passkeyError"));
        throw new Error("Invalid passkey");
      }
    },
    onSuccess: (data) => {
      if (data?.isAdmin && data?.auth) {
        navigate("/admin");
      }
      setOpen(false);
    },
    onError: (err) => {
      setError(t("indexPage.passkeyError"));
      setOpen(true);
    },
  });

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between w-full">
            {t("indexPage.passkeyTitle")}
            <img
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>{t("indexPage.passkeyDescription")}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          <Button onClick={(e) => validatePasskey(e)} className="shad-primary-btn w-full">
            {isPending ? <Spinner /> : null} {t("indexPage.passkeyButton")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
