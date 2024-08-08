import Image from "next/image";
import { Typography } from "@/src/components/ui";
import SelectChatIcon from "./SelectChatIcon.svg";
import { useTranslations } from "next-intl";

function SelectChatWindow() {
  const t = useTranslations("screens.Chats.Main_Window");

  return (
    <div className="flex h-full flex-col items-center justify-center gap-14">
      <Image src={SelectChatIcon} alt="Select chat icon" />
      <Typography variant="regular" tag="p" className="font-bold">
        {t("select_conversation_subtitle")}
      </Typography>
    </div>
  );
}

export default SelectChatWindow;
