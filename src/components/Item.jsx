import { useState, useContext } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";

import { TextField, Button } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Link, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PersonRemove } from "@mui/icons-material";
import { green } from "@mui/material/colors";

import { itemContext } from "../App";
import NotEditableItem from "./NotEditableItem";
import EditableItem from "./EditableItem";

// import { itemContext } from "../App";

function Item({ item }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [textToEdit, setTextToEdit] = useState(item.itemName);

  const { items, setItems } = useContext(itemContext);

  const handleEditName = () => {
    setIsEditMode((previous) => !previous);
  };

  const handleEditLink = () => {
    console.log("edit link");
  };

  const handleItemNameChanged = (event) => {
    setTextToEdit(event.target.value);
    item.itemName = event.target.value;
    const localStorageData = JSON.parse(localStorage.getItem("items"));
    localStorageData.map((localStorageItem) => {
      if (localStorageItem.id === item.id)
        localStorageItem.itemName = item.itemName;
    });
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(localStorageData));
  };

  const handlePersonRemove = () => {
    items.forEach((currentItem) => {
      if (currentItem.id === item.id) {
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
          handlePersonRemove={handlePersonRemove}
          handleEditName={handleEditName}
        />
      )}

      {!isEditMode && (
        <IconButton onClick={handleEditName} aria-label="edit">
          <EditIcon />
        </IconButton>
      )}
    </>
  );
}
export default Item;
