import { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";

import { Divider, Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import Item from "./Item";
import { itemContext } from "../context/itemContext";
import { deleteDocuments } from "./data/firestore";

function ListOfItems() {
  const { items, setItems } = useContext(itemContext);

  const handleDeleteCheckedItems = () => {
    // let notCheckedItems = items.filter((item) => !item.checked);
    // setItems(notCheckedItems);
    // let toDeleteItems = items.filter((item) => item.checked);
    // deleteDocuments(toDeleteItems);

    let [itemsToKeep, itemsToDelete] = items.reduce(
      (acc, item) => {
        item.checked ? acc[1].push(item) : acc[0].push(item);
        return acc;
      },
      [[], []]
    );

    setItems(itemsToKeep);
    deleteDocuments(itemsToDelete);
  };

  const handleDeleteAll = () => {
    setItems([]);
    deleteDocuments(items);
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
      <Button variant="outlined" onClick={handleDeleteCheckedItems}>
        Delete Selected
      </Button>
      <Button variant="contained" onClick={handleDeleteAll}>
        Delete All
      </Button>
    </Box>
  );
}

export default ListOfItems;
