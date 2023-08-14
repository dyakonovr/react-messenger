import { ReactNode } from "react";
import classes from './SidebarButton.module.scss';
import { useScreenStore } from "../../../store/screenStore";

interface ISidebarButtonProps {
  isActive: boolean,
  children: ReactNode,
  screen: IScreen
}

function SidebarButton({ isActive, children, screen }: ISidebarButtonProps) {
  const setScreen = useScreenStore(state => state.setScreen);
  const currentClasses = isActive ? [classes.sidebar_button, classes.sidebar_button_active].join(' ') : classes.sidebar_button;

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