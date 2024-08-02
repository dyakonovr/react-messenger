import { LoaderSpin, Typography } from "@/src/components/ui";
import classes from "./styles.module.css";
import { useScrollPagination } from "@/src/hooks/general/useScrollPagination";
import { ChatsListData } from "./components/Data";
import { useDialogsDataContext } from "../../../../providers/DialogsDataProvider";
import { useTranslations } from "use-intl";

export function ChatsList() {
  const t = useTranslations("screens.Chats.Sidebar");
  const { isFetching, triggerFetchData } = useDialogsDataContext();
  const listRef = useScrollPagination<HTMLDivElement>(triggerFetchData, "bottom");

  return (
    <div className="mt-7">
      <hr className="mb-4 bg-[#B4B4B4]" />
      <Typography tag="p" variant="regular" className="mb-6 font-bold text-[#676667]">
        {t("all_chats_block_subtitle")}
      </Typography>

      {isFetching && <LoaderSpin size="xs" />}

      {!isFetching && (
        <div className={classes.chats_list} ref={listRef}>
          <ChatsListData />
        </div>
      )}
    </div>
  );
}
