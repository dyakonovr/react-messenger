import { Typography } from "@/src/components/ui";
import ChatItem from "./Item";
import classes from "./styles.module.css";
import type { IDialogsRecord } from "@/src/types/features/dialog";
import type { Nullable } from "@/src/types/general/nullable";
import { useSortedDialogs } from "./hooks/useSortedDialogs";
import { useScrollPagination } from "@/src/hooks/general/useScrollPagination";

interface IProps {
  dialogs: Nullable<IDialogsRecord>;
  selectedChatId: Nullable<string>;
  selectChat: (chatId: Nullable<string>) => void;
  triggerFetchData: () => void;
}

export function ChatsList({
  dialogs,
  selectChat,
  selectedChatId,
  triggerFetchData
}: IProps) {
  const isDialogsEmpty = dialogs && Object.keys(dialogs).length === 0;
  const listRef = useScrollPagination<HTMLDivElement>(triggerFetchData, "bottom");
  const sortedDialogIds = useSortedDialogs(dialogs);

  return (
    <div className="mt-7">
      <hr className="mb-4 bg-[#B4B4B4]" />
      <Typography tag="p" variant="regular" className="mb-6 font-bold text-[#676667]">
        All chats
      </Typography>
      <div className={classes.chats_list} ref={listRef}>
        {dialogs &&
          sortedDialogIds.map((chatId) => (
            <ChatItem
              dialog={dialogs[chatId]}
              userId={chatId}
              key={chatId}
              isSelected={selectedChatId === null ? false : selectedChatId === chatId}
              selectChat={selectChat}
            />
          ))}
        {isDialogsEmpty && <Typography variant="regular">No chats...</Typography>}
      </div>
      {dialogs === null && <Typography variant="small">Loading...</Typography>}
    </div>
  );
}
