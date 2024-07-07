import { Typography } from "@/src/components/ui";
import ChatItem from "./Item";
import classes from "./styles.module.css";
import type { IDialogsRecord } from "@/src/types/features/dialog";
import type { Nullable } from "@/src/types/general/nullable";

interface IProps {
  dialogs: Nullable<IDialogsRecord>;
  selectedDialogId: Nullable<string>;
  selectDialog: (dialogId: Nullable<string>) => void;
}

export function ChatsList({ dialogs, selectDialog, selectedDialogId }: IProps) {
  return (
    <div className="mt-7">
      <hr className="mb-4 bg-[#B4B4B4]" />
      <Typography tag="p" variant="regular" className="mb-6 font-bold text-[#676667]">
        All chats
      </Typography>
      <div className={classes.chats_list}>
        {dialogs &&
          Object.keys(dialogs).map((userId) => (
            <ChatItem
              dialog={dialogs[userId]}
              userId={userId}
              key={userId}
              isSelected={selectedDialogId === null ? false : selectedDialogId === userId}
              selectDialog={selectDialog}
            />
          ))}
      </div>
      {dialogs === null && <Typography variant="small">Loading...</Typography>}
    </div>
  );
}
