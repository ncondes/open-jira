import { createContext } from "react";

interface ContextProps {
   sidemenuIsOpen: boolean;
   // Methods
   openSidebar: () => void;
   closeSidebar: () => void;
}

export const UiContext = createContext({} as ContextProps);