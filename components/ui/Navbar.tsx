import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FC, useContext } from "react";
import { UiContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar: FC = () => {
   const { openSidebar } = useContext(UiContext);

   return (
      <AppBar position="sticky" elevation={0}>
         <Toolbar>
            <IconButton
               size="large"
               edge="start"
               onClick={openSidebar}
            >
               <MenuOutlinedIcon />
            </IconButton>
            <NextLink href="/" passHref>
               <Link underline="none" color="#FFF">
                  <Typography variant="h6">Open Jira</Typography>
               </Link>
            </NextLink>
         </Toolbar>
      </AppBar>
   );
};
