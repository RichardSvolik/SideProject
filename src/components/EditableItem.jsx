import { useState, useContext } from "react";
import { TextField, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { itemContext } from "../context/itemContext";
import { setFireStoreData } from "./data/firestore";

function EditableItem({ item, setIsEditMode }) {
  const { items, setItems } = useContext(itemContext);
  const [editedItem, setEditedItem] = useState(item);

  const handleEditName = () => {
    setIsEditMode((previous) => !previous);
  };

  const ATTRIBUTE_NAME = {
    NAME: "itemName",
    LINK: "itemLink",
    PRICE: "itemPrice",
    ASSIGNED_TO_NAME: "name",
    ASSIGNED_TO_EMAIL: "email",
  };

  const handleItemChanged = (event, attributeToChange) => {
    switch (attributeToChange) {
      default:
        {
          setEditedItem((prev) => ({
            ...prev,
            [attributeToChange]: event.target.value,
          }));
        }
        break;
      case ATTRIBUTE_NAME.ASSIGNED_TO_NAME:
      case ATTRIBUTE_NAME.ASSIGNED_TO_EMAIL:
        {
          setEditedItem((prev) => ({
            ...prev,
            assignedTo: {
              ...prev.assignedTo,
              [attributeToChange]: event.target.value,
            },
          }));
        }
        break;
    }
  };

  const updateItems = async () => {
    const newItems = items.map((item) => {
      if (item.id === editedItem.id) {
        return editedItem;
      } else return item;
    });
    setItems(newItems);
    setIsEditMode(false);
    await setFireStoreData(newItems);
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
          onChange={(event) => handleItemChanged(event, ATTRIBUTE_NAME.NAME)}
        ></TextField>
        <TextField
          size="small"
          label="Link"
          value={editedItem.itemLink}
          onChange={(event) => handleItemChanged(event, ATTRIBUTE_NAME.LINK)}
        ></TextField>
        <TextField
          size="small"
          label="Price"
          value={editedItem.itemPrice}
          onChange={(event) => handleItemChanged(event, ATTRIBUTE_NAME.PRICE)}
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
            value={editedItem.assignedTo.name}
            onChange={(event) =>
              handleItemChanged(event, ATTRIBUTE_NAME.ASSIGNED_TO_NAME)
            }
          ></TextField>
          <TextField
            size="small"
            label="e-mail"
            value={editedItem.assignedTo.email}
            onChange={(event) =>
              handleItemChanged(event, ATTRIBUTE_NAME.ASSIGNED_TO_EMAIL)
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
