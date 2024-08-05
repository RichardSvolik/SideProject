import { useContext } from "react";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Link, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { PersonRemove } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LibraryAdd } from "@mui/icons-material";

import { itemContext } from "../../context/itemContext";
import { deleteDocuments } from "../data/firestore";

function NotEditableItem({ item }) {
  const { items, setItems } = useContext(itemContext);

  const handlePersonRemove = () => {
    items.forEach((currentItem) => {
      if (currentItem.id === item.id) {
        currentItem.assignedTo = { email: "", name: "" };
      }
    });
    setItems([...items]);
  };

  const handleDeleteItem = (itemToDelete) => {
    let filteredItems = [];
    if (!itemToDelete.id) {
      filteredItems = items.filter((item) => !item.checked);
    } else filteredItems = items.filter((item) => item.id !== itemToDelete.id);
    setItems(filteredItems);
    deleteDocuments([itemToDelete]);
  };

  const handleDuplicateItem = (id) => {
    const filteredItem = items.find((item) => item.id === id);
    const duplicatedItem = { ...filteredItem };
    duplicatedItem.id = Date.now();
    setItems([...items, duplicatedItem]);
  };

  return (
    <>
      <ListItemText
        style={{
          maxWidth: "500px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        primary={<Typography>{item.itemName}</Typography>}
        secondary={
          <Typography
            noWrap
            sx={{ display: "inline" }}
            component="span"
            variant="body"
            color="text.primary"
          >
            <Box sx={{ maxWidth: "200px" }}>
              <Typography noWrap>
                <Link target="_blank" href={item.itemLink}>
                  Link to web
                </Link>
              </Typography>
            </Box>
            <Typography sx={{ color: green[800] }}>
              {item.itemPrice},-
            </Typography>
            <Typography color="text.secondary">
              {item.assignedTo?.name ? (
                <>
                  {item.assignedTo.name} {item.assignedTo.email}
                  <IconButton
                    onClick={handlePersonRemove}
                    aria-label="personRemove"
                  >
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
      <IconButton
        edge="end"
        aria-label="deleteItem"
        onClick={() => handleDeleteItem(item)}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        aria-label="duplicateItem"
        onClick={() => handleDuplicateItem(item.id)}
      >
        <LibraryAdd />
      </IconButton>
    </>
  );
}
export default NotEditableItem;
