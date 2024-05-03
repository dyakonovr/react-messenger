import Image from "next/image";
import { Typography } from "@/src/components/ui";
import SelectChatIcon from "./SelectChatIcon.svg";

function SelectChatWindow() {
  return (
    <div className="flex flex-col items-center justify-center gap-14">
      <Image src={SelectChatIcon} alt="Select chat icon" />
      <Typography variant="regular" tag="p" className="font-bold">
        Select a conversation
      </Typography>
    </div>
  );
}

export default SelectChatWindow;
