import { useTranslation } from "react-i18next";
import ArabicIcon from "./CustomIcons/ArabicIcon";
import EnglishIcon from "./CustomIcons/EnglishIcon";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const LanguageSwitcher = () => {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <div className="size-6">
                {language === "en" ? <EnglishIcon className="size-full" /> : <ArabicIcon className="size-full" />}
              </div>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t("languageSwitcher.label")}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem checked={language === "en"} onClick={() => changeLanguage("en")}>
          <EnglishIcon className="size-4.5" />
          English
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={language === "ar"} onClick={() => changeLanguage("ar")}>
          <ArabicIcon className="size-4.5" />
          العربية
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
