import "../styles/globals.css";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { EntriesProvider } from "../context/entries";
import { lightTheme, darkTheme } from "../themes";
import { UiProvider } from "../context/ui";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <SnackbarProvider maxSnack={3}>
         <EntriesProvider>
            <UiProvider>
               <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
               </ThemeProvider>
            </UiProvider>
         </EntriesProvider>
      </SnackbarProvider>
   );
}

export default MyApp;
