import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import {
  Home,
  Settings,
  Person,
  Storefront,
  AccountBox,
  ModeNight,
  Article,
  Group,
} from "@mui/icons-material/";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/Feed">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/AddItem">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Add Item" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
