import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/Feed">
            Feed
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/AddItem">
            Add Item
          </MenuItem>
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          What I want for Christmas
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

{
  /* <Toolbar>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            left: 15,
          }}
        ></Box>

        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          What I want for christmas
        </Typography>
        <Typography variant="h6" sx={{ display: { xs: "block", sm: "none" } }}>
          🎄
        </Typography>
      </Toolbar>
      */
}
