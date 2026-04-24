import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PasskeyModal } from "./PasskeyModal";
import { Button } from "./ui/button";

const AdminForm = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" className="text-green-500 hover:text-green-500" onClick={() => setOpen(true)}>
        {t("indexPage.admin")}
      </Button>

      <PasskeyModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AdminForm;
