import { Avatar, Typography } from "@/src/components/ui";
import { ScreenLayoutWithSidebarBackToSidebarButton } from "@/src/components/ui/ScreenLayoutWithSidebar/BackToSidebarButton";
import type { IDialogInfo } from "@/src/types/features/dialog";
import { useTranslations } from "next-intl";

interface IProps {
  info: IDialogInfo | null;
  isLoading: boolean;
}

export function ChatHeader({ info, isLoading }: IProps) {
  const t = useTranslations("common");

  return (
    <div className="flex bg-[#F8FAFF] px-8 py-4">
      <ScreenLayoutWithSidebarBackToSidebarButton className="mr-5 !px-2 !py-1" />
      <Avatar
        alt={`${info?.name} avatar`}
        nickname={info?.name ?? ""}
        src={info?.avatar ?? ""}
        isLoading={isLoading}
      />

      <div className="ms-4 flex flex-col">
        <Typography
          variant="regular"
          tag="p"
          className="max-w-[250px] truncate font-bold"
        >
          {isLoading ? t("loading") : info?.name}
        </Typography>
      </div>
    </div>
  );
}
