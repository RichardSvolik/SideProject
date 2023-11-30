import { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";

import { Divider, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { LibraryAdd } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

import Item from "./Item";
import { itemContext } from "../App";

function ListOfItems({ setIsItemNameValid, setIsLinkValid }) {
  const { items, setItems } = useContext(itemContext);
  const handleDeleteItem = (itemToDelete) => {
    let filteredItems = [];
    if (!itemToDelete) {
      filteredItems = items.filter((item) => !item.checked);
    } else filteredItems = items.filter((item) => item.id !== itemToDelete);
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(items));
    setItems(filteredItems);
    setIsLinkValid(false);
    setIsItemNameValid(false);
  };

  const handleDuplicateItem = (id) => {
    const filteredItem = items.find((item) => item.id === id);
    const duplicatedItem = { ...filteredItem };
    duplicatedItem.id = Date.now();
    setItems([...items, duplicatedItem]);
  };

  const handleCheckBoxChange = (id) => {
    items.map((item) => {
      if (item.id === id) {
        item.checked = true;
      }
    });
  };

  return (
    <Box sx={{ flex: 3, padding: 2 }}>
      <Box>
        {items.map((item) => (
          <>
            <List sx={{ bgcolor: "background.paper" }}>
              <Divider variant="inset" component="li" />
              <ListItem key={item.itemName} alignItems="center">
                <Checkbox
                  edge="start"
                  onChange={() => handleCheckBoxChange(item.id)}
                />
                <Item item={item} />
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
              </ListItem>
            </List>
          </>
        ))}
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          handleDeleteItem();
        }}
      >
        Delete Selected
      </Button>
    </Box>
  );
}

export default ListOfItems;
