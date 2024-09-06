import { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, styled, Modal, Typography } from "@mui/material";

import { Divider, Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

// import Item from "./Item";
import Item from "../addItem/Item";
import { itemContext } from "../../context/itemContext";
import { deleteDocuments } from "../data/firestore";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function ListOfItems() {
  const { items, setItems } = useContext(itemContext);

  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleDeleteCheckedItems = () => {
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
    // deleteDocuments(items);
    toggleModal();
  };

  const handleCheckBoxChange = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      })
    );
  };

  const isNothingSelected = !items.some((item) => item.checked);

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
        onClick={handleDeleteCheckedItems}
        disabled={isNothingSelected}
      >
        Delete Selected
      </Button>
      <Button
        variant="contained"
        onClick={toggleModal}
        disabled={items.length === 0}
      >
        Delete All
      </Button>
      <StyledModal open={open} onClose={toggleModal}>
        <Box className="modalStyle">
          <Typography className="custom-typography">
            Delete everything?
          </Typography>
          <Button
            onClick={handleDeleteAll}
            color="primary"
            variant="contained"
            autoFocus
          >
            OK
          </Button>
          <Button onClick={toggleModal}>Cancel</Button>
        </Box>
      </StyledModal>
    </Box>
  );
}

export default ListOfItems;
