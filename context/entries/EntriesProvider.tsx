import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";

export interface EntriesState {
   entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
   entries: [
      {
         _id: uuidv4(),
         description: "TO-DO: Ullamco adipisicing Lorem est anim ut commodo ad ea magna aute.",
         status: "to-do",
         createdAt: Date.now(),
      },
      {
         _id: uuidv4(),
         description: "IN-PROGRESS: Proident laboris ad officia culpa aliqua nisi culpa aliquip sunt ea cillum.",
         status: "in-progress",
         createdAt: Date.now() - 1000000,
      },
      {
         _id: uuidv4(),
         description: "COMPLETED: Labore officia sit commodo deserunt irure dolor ullamco fugiat.",
         status: "completed",
         createdAt: Date.now() - 100000,
      },
   ],
};

export const EntriesProvider: FC = ({ children }) => {
   const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

   const addNewEntry = (description: string) => {
      const NewEntry: Entry = {
         _id: uuidv4(),
         description,
         createdAt: Date.now(),
         status: "to-do"
      };
      dispatch({ type: "[Entries] - Add Entry", payload: NewEntry });
   };

   const updateEntry = (payload: Entry) => {
      dispatch({ type: "[Entries] - Entry Updated", payload });
   };

   return (
      <EntriesContext.Provider value={{
         ...state,
         // Methods
         addNewEntry,
         updateEntry,
      }}>
         {children}
      </EntriesContext.Provider>
   );
};