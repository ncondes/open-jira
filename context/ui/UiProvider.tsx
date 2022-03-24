import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
   sidemenuIsOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
   sidemenuIsOpen: false
};

export const UiProvider: FC = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const openSidebar = () => {
      dispatch({ type: "UI - Open Sidebar" });
   };

   const closeSidebar = () => {
      dispatch({ type: "UI - Close Sidebar" });
   };

   return (
      <UiContext.Provider value={{
         ...state,
         // Methods
         openSidebar,
         closeSidebar,
      }}>
         {children}
      </UiContext.Provider>
   );
};