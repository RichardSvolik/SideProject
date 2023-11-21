import { useState } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { TextField } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";

function Item({ item }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [textToEdit, setTextToEdit] = useState(item.itemName);

  const onEdit = (event) => {
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

    //TOTO save to local storage
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
              <IconButton onClick={onEdit} aria-label="edit">
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
                    <IconButton onClick={onEdit} onKeyDown={onEdit}>
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
            <Typography color="text.secondary">{item.itemPrice},-</Typography>
            {/* ^ currency formatter can be used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat */}
          </Typography>
        }
      />
    </>
  );
}
export default Item;
