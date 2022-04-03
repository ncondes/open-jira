import { DragEvent, FC, useContext } from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Entry } from "../../interfaces";
import { UiContext } from "../../context/ui";
import { EntriesContext } from "../../context/entries/EntriesContext";

interface Props {
   entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
   const { startDragging, endDragging } = useContext(UiContext);
   const { deleteEntry } = useContext(EntriesContext);

   const onDragStart = (e: DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("text", entry._id);
      startDragging();
   };

   const onDragEnd = () => {
      endDragging();
   };

   const onDelete = () => {
      deleteEntry(entry);
   };

   return (
      <Card
         sx={{ marginBottom: 1, position: "relative" }}
         draggable
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
      >
         <Box display="flex" justifyContent="flex-end" >
            <Button
               endIcon={<CloseIcon />}
               onClick={onDelete}
            ></Button>
         </Box>

         <CardActionArea>
            <CardContent>
               <Typography sx={{ whiteSpace: "pre-line" }}>
                  {entry.description}
               </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
               <Typography variant="body2">30 Minutes Ago</Typography>
            </CardActions>
         </CardActionArea>
      </Card >
   );
};
