import { ChangeEvent, useState, useMemo, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import { DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, useTheme } from "@mui/material";
import { Layout } from "../../components/layouts/Layout";
import { Entry, EntryStatus } from "../../interfaces";
import { isValidObjectId } from "mongoose";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["to-do", "in-progress", "completed"];

interface Props {
   entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
   const [inputValue, setInputValue] = useState(entry.description);
   const [status, setStatus] = useState<EntryStatus>(entry.status);
   const [touched, setTouched] = useState(false);

   const { updateEntry, deleteEntry } = useContext(EntriesContext);

   const router = useRouter();

   const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

   const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.target.value as EntryStatus);
   };

   const onSave = () => {
      if (inputValue.trim().length === 0) return;

      const updatedEntry: Entry = {
         ...entry,
         description: inputValue,
         status,
      };
      updateEntry(updatedEntry, true);
   };

   const onDelete = () => {
      deleteEntry(entry);
      router.replace("/");
   };

   // const theme = useTheme();
   // console.log(theme);

   return (
      <Layout title={inputValue.substring(0, 20) + "..."}>
         <Grid
            container
            justifyContent="center"
            sx={{ marginTop: 2 }}
         >
            <Grid item xs={12} sm={8} md={6}>
               <Card>
                  <CardHeader
                     title={`Entry: ${inputValue}`}
                     subheader={dateFunctions.getFormatDistanceToNow(entry.createdAt)}
                  />
                  <CardContent>
                     <TextField
                        sx={{
                           marginTop: 2,
                           marginBottom: 1,
                        }}
                        fullWidth
                        placeholder="New Entry"
                        autoFocus
                        multiline
                        label="New Entry"
                        value={inputValue}
                        helperText={isNotValid && "Enter a value"}
                        onChange={onTextFieldChanged}
                        onBlur={() => setTouched(true)}
                        error={isNotValid}

                     />
                     <FormControl>
                        <FormLabel>Status:</FormLabel>
                        <RadioGroup
                           row
                           value={status}
                           onChange={onStatusChange}
                        >
                           {
                              validStatus.map((option) => (
                                 <FormControlLabel
                                    key={option}
                                    value={option}
                                    label={capitalize(option)}
                                    control={<Radio />}
                                 />
                              ))
                           }
                        </RadioGroup>
                     </FormControl>
                  </CardContent>
                  <CardActions>
                     <Button
                        startIcon={<SaveOutlined />}
                        variant="contained"
                        fullWidth
                        onClick={onSave}
                        disabled={inputValue.length <= 0}
                     >
                        Save
                     </Button>
                  </CardActions>
               </Card>
            </Grid>
         </Grid>
         <IconButton
            sx={{
               position: "fixed",
               bottom: 30,
               right: 30,
               backgroundColor: "error.dark"
            }}
            onClick={onDelete}
         >
            <DeleteOutlined />
         </IconButton>
      </Layout>
   );
};




export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   const { id } = params as { id: string };

   const entry = await dbEntries.getEntryById(id);

   // Redirect to the home page and do NOT load [id] screen
   if (!entry) {
      return {
         redirect: {
            destination: "/",
            permanent: false,
         },
      };
   }

   return {
      props: {
         entry,
      },
   };
};

export default EntryPage;