import { Button } from "@/src/components/ui";
import { LogOut as LogoutIcon } from "lucide-react";
import { useUserStore } from "@/src/stores/user";
import { useRouter } from "next/navigation";
import AuthService from "@/src/services/auth";
import { PagePaths } from "@/src/enums/PagePaths";

export function SidebarLogoutButton() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  // Functions
  function logout() {
    try {
      AuthService.logout();
      clearUser();
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
