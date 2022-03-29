import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
   sidemenuIsOpen: boolean;
   isAdding: boolean;
   isDragging: boolean;
}

const UI_INITIAL_STATE: UiState = {
   sidemenuIsOpen: false,
   isAdding: false,
   isDragging: false,
};

export const UiProvider: FC = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const openSidebar = () => {
      dispatch({ type: "UI - Open Sidebar" });
   };

   const closeSidebar = () => {
      dispatch({ type: "UI - Close Sidebar" });
   };

   const setIsAdding = (payload: boolean) => {
      dispatch({ type: "UI - Toggle isAdding", payload });
   };

   const startDragging = () => {
      dispatch({ type: "UI - Start Dragging" });
   };

   const endDragging = () => {
      dispatch({ type: "UI - End Dragging" });
   };

   return (
      <UiContext.Provider value={{
         ...state,
         // Methods
         openSidebar,
         closeSidebar,

         setIsAdding,
         
         startDragging,
         endDragging,
      }}>
         {children}
      </UiContext.Provider>
   );
};