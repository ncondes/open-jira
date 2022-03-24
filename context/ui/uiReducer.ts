import { UiState } from "./";

type UiActionType =
   | { type: "UI - Open Sidebar" }
   | { type: "UI - Close Sidebar" }
   
export const uiReducer = (state: UiState, action: UiActionType): UiState => {
   switch (action.type) {
      case "UI - Open Sidebar":
         return {
            ...state,
            sidemenuIsOpen: true,
         };
      case "UI - Close Sidebar":
         return {
            ...state,
            sidemenuIsOpen: false,
         };
      default:
         return state;
   }
};