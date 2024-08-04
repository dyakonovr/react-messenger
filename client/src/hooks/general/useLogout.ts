import { useChatsStore } from "@/src/stores/useChatsStore";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import { useUserStore } from "@/src/stores/useUserStore";
import { useRouter } from "@/src/utils/navigation";
import AuthService from "@/src/services/auth";
import { PagePaths } from "@/src/enums/PagePaths";

export const useLogout = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const clearChats = useChatsStore((state) => state.clearChats);
  const clearDialogs = useDialogsStore((state) => state.clearDialogs);

  // Functions
  function logout() {
    try {
      AuthService.logout();
      clearStores();
      router.push(PagePaths.LOGIN);
    } catch (error) {
      console.log(error);
    }
  }

  function clearStores() {
    clearChats();
    clearDialogs();
    clearUser();
  }
  // Functions END

  return logout;
};
