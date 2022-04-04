import { FC, useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";
import { entriesApi } from "../../api";

export interface EntriesState {
   entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
   entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
   const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

   const addNewEntry = async(description: string) => {
      try {
         const { data } = await entriesApi.post<Entry>("/entries", { description });

         dispatch({ type: "[Entries] - Add Entry", payload: data });
      } catch (err) {
         console.error(err);
      }
   };

   const updateEntry = async(payload: Entry, showSnackbar = false) => {
      try {
         const { _id, description, status } = payload;
         const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });

         if (showSnackbar) {
            enqueueSnackbar("Entry Updated", {
               variant: "success",
               autoHideDuration: 1500,
               anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
               },
            });
         }

         dispatch({ type: "[Entries] - Entry Updated", payload: data });
      } catch (err) {
         console.error(err);
      }
   };

   const deleteEntry = async(payload: Entry) => {
      try {
         const { _id } = payload;
         await entriesApi.delete(`entries/${_id}`);

         dispatch({ type: "[Entries] - Entry Deleted", payload });
      } catch (err) {
         console.error(err);
      }
   };

   const refreshEntries = async() => {
      const { data } = await entriesApi.get<Entry[]>("/entries");
      dispatch({ type: "[Entries] - Refresh Data", payload: data });
   };
   
   useEffect(() => {
      refreshEntries();
   }, []);


   return (
      <EntriesContext.Provider value={{
         ...state,
         // Methods
         addNewEntry,
         updateEntry,
         deleteEntry,
      }}>
         {children}
      </EntriesContext.Provider>
   );
};