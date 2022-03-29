import { UiState } from "./";

type UiActionType =
   | { type: "UI - Open Sidebar" }
   | { type: "UI - Close Sidebar" }
   | { type: "UI - Toggle isAdding", payload: boolean }
   | { type: "UI - Start Dragging" }
   | { type: "UI - End Dragging" }
   
   
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
      case "UI - Toggle isAdding":
         return {
            ...state,
            isAdding: action.payload,
         };
      case "UI - Start Dragging":
         return {
            ...state,
            isDragging: true,
         };
      case "UI - End Dragging":
         return {
            ...state,
            isDragging: false,
         };

      default:
         return state;
   }
};