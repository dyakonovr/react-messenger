import { Button } from "@/src/components/ui";
import { LogOut as LogoutIcon } from "lucide-react";
import AuthService from "@/src/services/auth";
import { PagePaths } from "@/src/enums/PagePaths";
import { useRouter } from "@/src/utils/navigation";
import { useLogout } from "@/src/hooks/general/useLogout";

export function SidebarLogoutButton() {
  const router = useRouter();
  const logoutFunc = useLogout();

  // Functions
  function logout() {
    try {
      AuthService.logout();
      logoutFunc();
      router.push(PagePaths.LOGIN);
    } catch (error) {
      console.log(error);
    }
  }
  // Functions END

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
