import { useChatsStore } from "@/src/stores/useChatsStore";
import { useDialogsStore } from "@/src/stores/useDialogsStore";
import { useUserStore } from "@/src/stores/useUserStore";

export const useLogout = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const clearChats = useChatsStore((state) => state.clearChats);
  const clearDialogs = useDialogsStore((state) => state.clearDialogs);

  // Functions
  function logout() {
    clearChats();
    clearDialogs();
    clearUser();
  }
  // Functions END

  return logout;
};
