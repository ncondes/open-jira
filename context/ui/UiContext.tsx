import { createContext } from "react";

interface ContextProps {
   sidemenuIsOpen: boolean;
   isAdding: boolean;
   isDragging: boolean;

   // Methods
   openSidebar: () => void;
   closeSidebar: () => void;

   setIsAdding: (payload: boolean) => void;

   startDragging: () => void;
   endDragging: () => void;
}

export const UiContext = createContext({} as ContextProps);