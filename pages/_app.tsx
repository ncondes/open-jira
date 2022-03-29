import "../styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { EntriesProvider } from "../context/entries";
import { lightTheme, darkTheme } from "../themes";
import { UiProvider } from "../context/ui";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <EntriesProvider>
         <UiProvider>
            <ThemeProvider theme={darkTheme}>
               <CssBaseline />
               <Component {...pageProps} />
            </ThemeProvider>
         </UiProvider>
      </EntriesProvider>
   );
}

export default MyApp;
