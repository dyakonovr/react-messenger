import { Button } from "@/src/components/ui";
import { LogOut as LogoutIcon } from "lucide-react";
import { useLogout } from "@/src/hooks/general/useLogout";

export function SidebarLogoutButton() {
  const logout = useLogout();

  return (
    <Button
      isIcon
      variant="transparent"
      onClick={logout}
      className="border-2 !border-[var(--main-color)]"
    >
      <LogoutIcon />
    </Button>
  );
}
