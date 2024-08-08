"use client";

import { Typography } from "@/src/components/ui";
import { ChatsSearchInput, ChatsList } from "./components";
import { useDialogsData } from "./useDialogsData";
import { useTranslations } from "next-intl";

export function Chats() {
  const t = useTranslations("screens.Chats.Sidebar");
  const updateChatSearchTerm = useDialogsData();

  return (
    <div className="custom-shadow z-[1] size-full min-h-full bg-[#F8FAFF] p-[30px] max-[840px]:h-auto">
      <Typography tag="h1" variant="title" className="mb-7">
        {t("title")}
      </Typography>
      <ChatsSearchInput
        onKeyDown={updateChatSearchTerm}
        placeholder={t("search_input_placeholder")}
      />
      <ChatsList />
    </div>
  );
}
