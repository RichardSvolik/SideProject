import { useState } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";

import NotEditableItem from "./NotEditableItem";
import EditableItem from "./EditableItem";

function Item({ item }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [textToEdit, setTextToEdit] = useState(item.itemName);

  const handleEditName = () => {
    setIsEditMode((previous) => !previous);
  };

  const handleItemNameChanged = (event) => {
    setTextToEdit(event.target.value);
    item.itemName = event.target.value;
    const localStorageData = JSON.parse(localStorage.getItem("items"));
    localStorageData.forEach((localStorageItem) => {
      if (localStorageItem.id === item.id)
        localStorageItem.itemName = item.itemName;
    });
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(localStorageData));
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
        <NotEditableItem
          item={item}
          isEditMode={isEditMode}
          textToEdit={textToEdit}
          handleItemNameChanged={handleItemNameChanged}
          // handlePersonRemove={handlePersonRemove}
          handleEditName={handleEditName}
        />
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
