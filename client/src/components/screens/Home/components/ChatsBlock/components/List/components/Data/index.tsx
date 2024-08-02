import { useSortedDialogs } from "./useSortedDialogs";
import ChatItem from "../Item";
import { Typography } from "@/src/components/ui";
import { useDialogsDataContext } from "@/src/components/screens/Home/providers/DialogsDataProvider";
import { useSelectedChatContext } from "@/src/components/screens/Home/providers/SelectedChatProvider";
import { useTranslations } from "next-intl";

export function ChatsListData() {
  const t = useTranslations("screens.Chats.Sidebar");
  const { selectedChatId, selectChat } = useSelectedChatContext();
  const { dialogs } = useDialogsDataContext();
  const isDialogsEmpty = dialogs && Object.keys(dialogs).length === 0;
  const sortedDialogIds = useSortedDialogs(dialogs);

  return (
    <>
      {dialogs &&
        sortedDialogIds.map((chatId) => (
          <ChatItem
            dialog={dialogs[chatId]}
            userId={chatId}
            key={chatId}
            isSelected={selectedChatId === chatId}
            selectChat={selectChat}
          />
        ))}
      {isDialogsEmpty && (
        <Typography variant="regular">{t("no_chats_subtitle")}</Typography>
      )}
    </>
  );
}
