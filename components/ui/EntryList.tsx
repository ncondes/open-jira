import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from "../../context/entries";
import { UiContext } from "../../context/ui";
import styles from "./EntryList.module.css";
import { style } from "@mui/system";

interface Props {
   status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
   const { entries, updateEntry } = useContext(EntriesContext);
   const { isDragging, endDragging } = useContext(UiContext);

   const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries]);

   const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
      const id = e.dataTransfer.getData("text");
      const entry = entries.find((entry) => entry._id === id)!;
      entry.status = status;
      updateEntry(entry);
      endDragging();
   };

   const allowDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
   };


   return (
      <div
         onDrop={onDropEntry}
         onDragOver={allowDrop}
         className={isDragging ? styles.dragging : ""}
      >
         <Paper
            sx={{
               backgroundColor: "transparent",
               height: "calc(100vh - 250px)",
               overflowY: "scroll",
               padding: "3px 6px",
               "&::-webkit-scrollbar": {
                  display: "none",
               },
            }}>
            <List sx={{ opacity: isDragging ? 0.25 : 1, transition: "all .25s" }}>
               {
                  entriesByStatus.map((entry) => (
                     <EntryCard key={entry._id} entry={entry} />
                  ))
               }
            </List>
         </Paper>
      </div>
   );
};
