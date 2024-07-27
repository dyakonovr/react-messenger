import { useCallback, useEffect } from "react";
import { useSelectedChatContext } from "../../../../providers/SelectedChatProvider";

export const useHandleEscapeClick = () => {
  const { selectChat } = useSelectedChatContext();

  useEffect(() => {
    document.addEventListener("keydown", handleEscClick);
    return () => document.removeEventListener("keydown", handleEscClick);
  }, []);

  // Functions
  const handleEscClick = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        selectChat(null);
      }
    },
    [selectChat]
  );
  // Functions END
};
