import { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";

import { Divider, Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import Item from "./Item";
import { itemContext } from "../context/itemContext";

function ListOfItems() {
  const { items, setItems } = useContext(itemContext);
  const handleDeleteItem = () => {
    let filteredItems = items.filter((item) => !item.checked);
    // let filteredItems = [];
    // if (!itemToDelete) {
    //   filteredItems = items.filter((item) => !item.checked);
    // } else filteredItems = items.filter((item) => item.id !== itemToDelete);
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));
    setItems(filteredItems);
  };

  const handleCheckBoxChange = (id) => {
    items.map((item) => {
      if (item.id === id) {
        item.checked = true;
      }
    });
  };

  return (
    <Box
      sx={{
        flex: 3,
        padding: 2,
        maxWidth: "70%",
      }}
    >
      <Box>
        {items.map((item) => (
          <>
            <List sx={{ bgcolor: "background.paper" }}>
              <Divider variant="inset" component="li" />
              <ListItem key={item.id} alignItems="center">
                <Checkbox
                  edge="start"
                  onChange={() => handleCheckBoxChange(item.id)}
                />
                <Item item={item} />
              </ListItem>
            </List>
          </>
        ))}
      </Box>
      <Button variant="outlined" onClick={handleDeleteItem}>
        Delete Selected
      </Button>
    </Box>
  );
}

export default ListOfItems;
