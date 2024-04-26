import { Typography } from "@/src/components/ui";
import Image from "next/image";
import classes from "./styles.module.css";

function ChatItem() {
  return (
    <div className={classes.dialog_wrapper}>
      <Image
        src="https://avatar.iran.liara.run/public/9"
        width={48}
        height={48}
        alt="User avatar"
        className="mt-auto"
      />
      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          Pink Panda
        </Typography>
        <Typography
          variant="small"
          tag="p"
          className="max-w-[250px] truncate text-[#7C7C7D]"
        >
          You: tnx!
        </Typography>
      </div>
      <div className="ms-auto flex flex-col">
        <Typography variant="small" tag="span" className="text-xs text-[#686768]">
          9:36
        </Typography>

        <Typography variant="small" tag="span" className={classes.new_messages_counter}>
          9+
        </Typography>
      </div>
    </div>
  );
}

export default ChatItem;
