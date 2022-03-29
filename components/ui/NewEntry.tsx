import { Box, Button, TextField } from "@mui/material";
import { SaveOutlined, AddCircleOutlined } from "@mui/icons-material";
import { ChangeEvent, useState, useContext } from "react";
import { EntriesContext } from "../../context/entries";
import { UiContext } from "../../context/ui";

export const NewEntry = () => {
   const [inputValue, setInputValue] = useState("");
   const [touched, setTouched] = useState(false);

   const { isAdding, setIsAdding } = useContext(UiContext);
   const { addNewEntry } = useContext(EntriesContext);

   const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   const onSave = () => {
      if (inputValue.length === 0) return;
      addNewEntry(inputValue);
      setIsAdding(false);
      setTouched(false);
      setInputValue("");
   };

   return (
      <Box sx={{ marginBottom: 2, paddingX: 2 }}>
         {
            isAdding ? (
               <>
                  <TextField
                     autoFocus
                     fullWidth
                     helperText={inputValue.length === 0 && touched && "Enter a value"}
                     error={inputValue.length === 0 && touched}
                     label="New Entry"
                     multiline
                     placeholder="New Entry"
                     sx={{ marginTop: 2, marginBottom: 1 }}
                     type=""
                     value={inputValue}
                     onChange={onTextFieldChange}
                     onBlur={() => setTouched(true)}
                  />
                  <Box display="flex" justifyContent="space-between">
                     <Button
                        variant="text"
                        onClick={() => setIsAdding(false)}
                     >
                        Cancel
                     </Button>
                     <Button
                        variant="outlined"
                        color="secondary"
                        endIcon={<SaveOutlined />}
                        onClick={onSave}
                     >
                        Save
                     </Button>
                  </Box>
               </>
            ) : (
               <Button
                  startIcon={<AddCircleOutlined />}
                  fullWidth
                  variant="outlined"
                  onClick={() => setIsAdding(true)}
               >
                  Add To-Do
               </Button>
            )
         }
      </Box>
   );
};
