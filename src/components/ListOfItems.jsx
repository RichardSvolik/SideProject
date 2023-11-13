import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";

import { Divider, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

import Item from "./Item";

function ListOfItems({ items, setItems, setIsItemNameValid, setIsLinkValid }) {
  const handleDeleteItem = (itemToDelete) => {
    let filteredItems = [];
    if (!itemToDelete) {
      filteredItems = items.filter((item) => !item.checked);
    } else
      filteredItems = items.filter((item) => item.itemName !== itemToDelete);
    console.log("filteredItems: ", filteredItems);
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(items));
    setItems(filteredItems);
    setIsLinkValid(false);
    setIsItemNameValid(false);
  };

  const handleCheckChange = (selectedName) => {
    items.map((item) => {
      if (item.itemName === selectedName) {
        item.checked = true;
      }
    });
  };

  return (
    <Box sx={{ flex: 4, padding: 2 }}>
      <Box>
        {items.map((item) => (
          <>
            <List sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
              <Divider variant="inset" component="li" />
              <ListItem key={item.itemName} alignItems="center">
                <Checkbox
                  edge="start"
                  onChange={() => handleCheckChange(item.itemName)}
                />
                <Item item={item} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteItem(item.itemName)}
                >
                  <DeleteIcon />
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
