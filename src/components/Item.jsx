import { useState } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";

import NotEditableItem from "./NotEditableItem";
import EditableItem from "./EditableItem";

function Item({ item }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditName = () => {
    setIsEditMode((previous) => !previous);
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
      {isEditMode ? (
        <EditableItem
          item={item}
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
        />
      ) : (
        <NotEditableItem item={item} />
      )}

      {!isEditMode && (
        <IconButton onClick={handleEditName} aria-label="editItem">
          <EditIcon />
        </IconButton>
      )}
    </>
  );
}
export default Item;
