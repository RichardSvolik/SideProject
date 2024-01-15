import { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";

import { Divider, Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import Item from "./Item";
import { itemContext } from "../App";

function ListOfItems({ setIsItemNameValid, setIsLinkValid }) {
  const { items, setItems } = useContext(itemContext);
  const handleDeleteItem = () => {
    let filteredItems = items.filter((item) => !item.checked);
    localStorage.clear();
    localStorage.setItem("items", JSON.stringify(items));
    setItems(filteredItems);
    setIsLinkValid(false);
    setIsItemNameValid(false);
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
      <Button
        variant="outlined"
        onClick={handleDeleteItem}
      >
        Delete Selected
      </Button>
    </Box>
  );
}

export default ListOfItems;
