import { useState, useContext } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { TextField } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PersonRemove } from "@mui/icons-material";
import { green } from "@mui/material/colors";

import { itemContext } from "../App";

// import { itemContext } from "../App";

function Item({ item }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [textToEdit, setTextToEdit] = useState(item.itemName);

  const { items, setItems } = useContext(itemContext);

  const handleEdit = (event) => {
    if (event.key === "Enter") console.log("Enter key pressed");
    setIsEditMode((previous) => !previous);
  };

  const handleItemNameChanged = (event) => {
    setTextToEdit(event.target.value);
    item.itemName = event.target.value;
    const localStorageData = JSON.parse(localStorage.getItem("items"));
    localStorageData.map((localStorageItem) => {
      if (localStorageItem.itemId === item.itemId)
        localStorageItem.itemName = item.itemName;
    });
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(localStorageData));
  };

  const handlePersonRemove = () => {
    items.forEach((currentItem) => {
      if (currentItem.itemId === item.itemId) {
        currentItem.assignedTo = { email: "", name: "" };
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
    setItems([...items]);
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar
          sx={{ maxWidth: "fit-content" }}
          variant="rounded"
          alt={item.itemName}
          src={item.itemImage}
        />
      </ListItemAvatar>
      <ListItemText
        noWrap
        style={{
          maxWidth: "500px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        primary={
          <>
            <Typography display={isEditMode ? "none" : "block"}>
              {item.itemName}
              <IconButton onClick={handleEdit} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Typography>
            {isEditMode && (
              <TextField
                sx={{ width: "100%" }}
                size="small"
                label="Item name"
                value={textToEdit}
                onChange={handleItemNameChanged}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleEdit} onKeyDown={handleEdit}>
                      <CheckIcon />
                    </IconButton>
                  ),
                }}
              ></TextField>
            )}
          </>
        }
        secondary={
          <Typography
            noWrap
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            <Link href={item.itemLink} target="_blank" underline="none">
              {item.itemLink}
            </Link>
            <Typography sx={{ color: green[800] }}>
              {item.itemPrice},-
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.assignedTo?.name ? (
                <>
                  {item.assignedTo.name}
                  <IconButton onClick={handlePersonRemove} aria-label="edit">
                    <PersonRemove />
                  </IconButton>
                </>
              ) : (
                "Not assigned"
              )}
            </Typography>
          </Typography>
        }
      />
    </>
  );
}
export default Item;
