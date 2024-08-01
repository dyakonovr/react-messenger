import { LoaderSpin, Typography } from "@/src/components/ui";
import classes from "./styles.module.css";
import { useScrollPagination } from "@/src/hooks/general/useScrollPagination";
import { ChatsListData } from "./components/Data";
import { useDialogsDataContext } from "../../../../providers/DialogsDataProvider";

export function ChatsList() {
  const { isFetching, triggerFetchData } = useDialogsDataContext();
  const listRef = useScrollPagination<HTMLDivElement>(triggerFetchData, "bottom");

  return (
    <div className="mt-7">
      <hr className="mb-4 bg-[#B4B4B4]" />
      <Typography tag="p" variant="regular" className="mb-6 font-bold text-[#676667]">
        All chats
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
