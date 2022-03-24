import { useContext } from "react";
import { InboxOutlined, MailOutlined } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { UiContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Draft"];
export const Sidebar = () => {
   const { sidemenuIsOpen, closeSidebar } = useContext(UiContext);

   return (
      <Drawer
         anchor="left"
         open={sidemenuIsOpen}
         onClose={closeSidebar}
      >
         <Box sx={{ width: 250 }}>
            <Box sx={{ p: "5px 10px" }}>
               <Typography variant="h4">Menu</Typography>
            </Box>
            <List>
               {
                  menuItems.map((item, i) => (
                     <ListItem button key={item}>
                        <ListItemIcon>
                           {i % 2 ? <InboxOutlined /> : <MailOutlined />}
                        </ListItemIcon>
                        <ListItemText primary={item} />
                     </ListItem>
                  ))
               }
            </List>
            <Divider />
            <List>
               {
                  menuItems.map((item, i) => (
                     <ListItem button key={item}>
                        <ListItemIcon>
                           {i % 2 ? <InboxOutlined /> : <MailOutlined />}
                        </ListItemIcon>
                        <ListItemText primary={item} />
                     </ListItem>
                  ))
               }
            </List>
         </Box>
      </Drawer>
   );
};
