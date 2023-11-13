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

  const onEdit = () => {
    setIsEditMode(true);
    console.log("onedit");
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
        primary={
          <>
            <Typography display={isEditMode ? "none" : "block"}>
              {item.itemName}
              {/* <EditIcon sx={{ fontSize: "default" }} onClick={onEdit} /> */}
              <IconButton onClick={onEdit} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Typography>
            {isEditMode && (
              <TextField
                size="small"
                label="Item name"
                value={item.itemName}
                InputProps={{
                  endAdornment: (
                    <IconButton>
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
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            <Link href={item.itemLink} target="_blank" underline="none">
              {item.itemLink}
            </Link>
          </Typography>
        }
      />
    </>
  );
}
export default Item;
