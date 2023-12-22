import { useState, useContext } from "react";
import { TextField, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { itemContext } from "../App";

function EditableItem({ item, setIsEditMode }) {
  const { items, setItems } = useContext(itemContext);
  const [editedItem, setEditedItem] = useState(item);
  const [editedItemAssignedTo, seteditedItemAssignedTo] = useState(
    item.assignedTo
  );

  const handleEditName = () => {
    setIsEditMode((previous) => !previous);
  };

  const ATTRIBUDE_NAME = {
    NAME: "NAME",
    LINK: "LINK",
    PRICE: "PRICE",
    ASSIGNED_TO_NAME: "ASSIGNED_TO_NAME",
    ASSIGNED_TO_EMAIL: "ASSIGNED_TO_EMAIL",
  };

  const handleItemChanged = (event, attributeToChange) => {
    switch (attributeToChange) {
      case ATTRIBUDE_NAME.NAME:
        {
          setEditedItem((prev) => ({ ...prev, itemName: event.target.value }));
        }
        break;
      case ATTRIBUDE_NAME.LINK:
        {
          setEditedItem((prev) => ({ ...prev, itemLink: event.target.value }));
        }
        break;
      case ATTRIBUDE_NAME.PRICE:
        {
          setEditedItem((prev) => ({ ...prev, itemPrice: event.target.value }));
        }
        break;
      case ATTRIBUDE_NAME.ASSIGNED_TO_NAME:
        {
          seteditedItemAssignedTo((prev) => ({
            ...prev,
            name: event.target.value,
          }));
        }
        break;
      case ATTRIBUDE_NAME.ASSIGNED_TO_EMAIL: {
        {
          seteditedItemAssignedTo((prev) => ({
            ...prev,
            email: event.target.value,
          }));
        }
      }
    }
  };

  const updateItems = () => {
    console.log(editedItem);
    items.map((item) => {
      console.log(item);
      if (item.id === editedItem.id) {
        item.itemName = editedItem.itemName;
        item.itemLink = editedItem.itemLink;
        item.itemPrice = editedItem.itemPrice;
        item.assignedTo.name = editedItemAssignedTo.name;
        item.assignedTo.email = editedItemAssignedTo.email;
      } else item;
    });
    setItems(items);
    setIsEditMode(false);
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    const localStorageData = JSON.parse(localStorage.getItem("items"));
    localStorageData.map((localStorageItem) => {
      if (localStorageItem.id === item.id) {
        localStorageItem.itemName = item.itemName;
        localStorageItem.itemLink = item.itemLink;
        localStorageItem.itemPrice = item.itemPrice;
        localStorageItem.assignedTo.name = item.assignedTo.name;
        localStorageItem.assignedTo.email = item.assignedTo.email;
      }
    });
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(localStorageData));
  };

  return (
    <Box
      sx={{
        paddingTop: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          size="small"
          label="Item"
          value={editedItem.itemName}
          onChange={(event) => handleItemChanged(event, ATTRIBUDE_NAME.NAME)}
        ></TextField>
        <TextField
          size="small"
          label="Link"
          value={editedItem.itemLink}
          onChange={(event) => handleItemChanged(event, ATTRIBUDE_NAME.LINK)}
        ></TextField>
        <TextField
          size="small"
          label="Price"
          value={editedItem.itemPrice}
          onChange={(event) => handleItemChanged(event, ATTRIBUDE_NAME.PRICE)}
        ></TextField>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "20px",
          }}
        >
          <TextField
            size="small"
            label="Name"
            value={editedItemAssignedTo.name}
            onChange={(event) =>
              handleItemChanged(event, ATTRIBUDE_NAME.ASSIGNED_TO_NAME)
            }
          ></TextField>
          <TextField
            size="small"
            label="e-mail"
            value={editedItemAssignedTo.email}
            onChange={(event) =>
              handleItemChanged(event, ATTRIBUDE_NAME.ASSIGNED_TO_EMAIL)
            }
          ></TextField>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={updateItems} onKeyDown={handleEditName}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={handleEditName} aria-label="edit">
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default EditableItem;
