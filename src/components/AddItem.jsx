import { useState, useEffect } from "react";

import { Box } from "@mui/material";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ListOfItems from "./ListOfItems";

const Feed = ({ items, setItems }) => {
  const [itemName, setItemName] = useState();
  const [itemLink, setItemLink] = useState();
  const [itemImage, setItemImage] = useState();
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [isItemNameValid, setIsItemNameValid] = useState();
  const [isLinkValid, setIsLinkValid] = useState();
  const [isPriceValid, setIsPriceValid] = useState();

  const validateItemName = (valueToValidate) => {
    valueToValidate.length >= 1
      ? setIsItemNameValid(true)
      : setIsItemNameValid(false);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      setIsLinkValid(true);
    } catch (_) {
      setIsLinkValid(false);
    }
  };

  const validateItemPrice = (valueToValidate) => {
    !isNaN(valueToValidate) ? setIsPriceValid(true) : setIsPriceValid(false);
  };

  const handleItemName = (event) => {
    validateItemName(event.target.value);
    setItemName(event.target.value);
  };

  const handleItemLink = (event) => {
    validateUrl(event.target.value);
    setItemLink(event.target.value);
  };

  const handleItemImage = (event) => {
    setItemImage(event.target.value);
  };

  const handleCategory = (event) => {
    setItemCategory(event.target.value);
  };

  const handleItemPrice = (event) => {
    validateItemPrice(event.target.value);
    setItemPrice(event.target.value);
  };

  const clearTextFields = () => {
    setItemLink("");
    setItemName("");
    setItemImage("");
    setItemPrice("");
    setItemCategory("");
  };

  const setInvalidState = () => {
    setIsLinkValid(false);
    setIsItemNameValid(false);
  };

  const onAdd = () => {
    setItems([
      ...items,
      {
        itemName: itemName,
        itemLink: itemLink,
        itemImage: itemImage,
        itemDate: new Date(),
        itemCategory: itemCategory,
        checked: false,
        itemPrice: itemPrice,
        itemId: Date.now(),
      },
    ]);
    clearTextFields();
    // setInvalidState();
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <Box
      sx={{
        flex: 4,
        padding: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          padding: 2,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          error={!isItemNameValid}
          id="outlined-basic"
          helperText={!isItemNameValid ? "Insert Item name" : ""}
          label="Item name"
          variant="outlined"
          value={itemName}
          onChange={handleItemName}
        />
        <TextField
          error={!isLinkValid}
          helperText={!isLinkValid ? "invalid link" : ""}
          id="outlined-basic"
          label="Link"
          value={itemLink}
          variant="outlined"
          onChange={handleItemLink}
        />
        <TextField
          id="outlined-basic"
          label="Image Link"
          value={itemImage}
          variant="outlined"
          onChange={handleItemImage}
        />
        <TextField
          error={!isPriceValid}
          helperText={!isPriceValid ? "insert a number" : ""}
          id="outlined-basic"
          label="Price"
          value={itemPrice}
          variant="outlined"
          onChange={handleItemPrice}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Group</InputLabel>
          <Select
            sx={{ minWidth: 195 }}
            value={itemCategory}
            onChange={handleCategory}
            label="Group"
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          flex: 4,
          padding: 2,
        }}
      >
        <Button
          disabled={
            !isItemNameValid ||
            !isLinkValid ||
            !isPriceValid ||
            itemName.length === 0 ||
            itemLink.length === 0
          }
          variant="contained"
          onClick={() => onAdd()}
        >
          Add
        </Button>
        <Button onClick={clearTextFields}>Clear</Button>
      </Box>
      <Box>
        <ListOfItems
          items={items}
          setItems={setItems}
          setIsItemNameValid={setIsItemNameValid}
          setIsLinkValid={setIsLinkValid}
          onAdd={onAdd}
        />
      </Box>
    </Box>
  );
};

export default Feed;
