import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Article } from "@mui/icons-material/";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderColor: "blue",
        width: 200,
      }}
    >
      <Box>
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
