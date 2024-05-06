import { Button, Input, Typography } from "@/src/components/ui";
import classes from "./styles.module.css";
import { Send as SendIcon } from "lucide-react";

function SettingsThemeExampleChat() {
  return (
    <div className="mt-3 rounded-2xl border">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-[#F0F4FA] p-4">
        <div className={`flex`}>
          <Typography
            tag="p"
            variant="regular"
            className={classes.message + " bg-white text-[#696969]"}
          >
            Hi, How are ya?
          </Typography>
        </div>
        <div className={`flex justify-end`}>
          <Typography
            tag="p"
            variant="regular"
            className={classes.message + " bg-[var(--main-color)] text-white"}
          >
            Oh, thanks
          </Typography>
        </div>
      </div>
      <div className="flex w-full items-center gap-6 rounded-b-2xl bg-white p-5">
        <Input placeholder="Write a message ..." className="rounded-[10px] px-4 py-3.5" />
        <Button variant="contained" className="p-2.5">
          <SendIcon size={24} />
        </Button>
      </div>
    </div>
  );
}

export default SettingsThemeExampleChat;
