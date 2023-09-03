import { ReactNode } from "react";
import { useScreenStore } from "../../../store/screenStore";

interface ISidebarButtonProps {
  isActive: boolean,
  children: ReactNode,
  screen: IScreen
}

function SidebarButton({ isActive, children, screen }: ISidebarButtonProps) {
  const setScreen = useScreenStore(state => state.setScreen);
  const currentClasses = isActive ? "sidebar_button sidebar_button_active" : "sidebar_button";

  return (
    <button
      className={currentClasses}
      onClick={() => setScreen(screen)}
    >
      {children}
    </button>
  );
};

export default SidebarButton;