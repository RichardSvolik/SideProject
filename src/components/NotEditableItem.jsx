import { useContext } from "react";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Link, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { PersonRemove } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LibraryAdd } from "@mui/icons-material";

import { itemContext } from "../App";

function NotEditableItem({ item, handlePersonRemove }) {
  const { items, setItems } = useContext(itemContext);

  const handleDeleteItem = (itemToDelete) => {
    let filteredItems = [];
    if (!itemToDelete) {
      filteredItems = items.filter((item) => !item.checked);
    } else filteredItems = items.filter((item) => item.id !== itemToDelete);
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(items));
    setItems(filteredItems);
    // setIsLinkValid(false);
    // setIsItemNameValid(false);
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
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => handleDeleteItem(item.id)}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => handleDuplicateItem(item.id)}>
        <LibraryAdd />
      </IconButton>
    </>
  );
}
export default NotEditableItem;
