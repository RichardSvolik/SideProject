import { useState, useEffect, useContext } from "react";

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
import { itemContext } from "../App";

const AddItem = () => {
  const { items, setItems, selectOptions } = useContext(itemContext);
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

  const onAdd = () => {
    setItems([
      {
        itemName: itemName,
        itemLink: itemLink,
        itemImage: itemImage,
        itemDate: new Date(),
        itemCategory: itemCategory,
        checked: false,
        itemPrice: itemPrice,
        id: Date.now(),
        assignedTo: { name: "", email: "" },
      },
      ...items,
    ]);
    clearTextFields();
    // setInvalidState();
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          error={!isItemNameValid}
          id="item-name"
          helperText={!isItemNameValid ? "Insert Item name" : ""}
          label="Item name"
          variant="outlined"
          value={itemName}
          onChange={handleItemName}
        />
        <TextField
          error={!isLinkValid}
          helperText={!isLinkValid ? "invalid link" : ""}
          id="item-link"
          label="Item Link"
          value={itemLink}
          variant="outlined"
          onChange={handleItemLink}
        />
        <TextField
          id="item-image"
          label="Image Link"
          value={itemImage}
          variant="outlined"
          onChange={handleItemImage}
        />
        <TextField
          error={!isPriceValid}
          helperText={!isPriceValid ? "insert a number" : ""}
          id="item-price"
          label="Price"
          value={itemPrice}
          variant="outlined"
          onChange={handleItemPrice}
        />
        <FormControl>
          <InputLabel id="item-select-category">Category</InputLabel>
          <Select
            error={!itemCategory}
            sx={{ minWidth: 195 }}
            value={itemCategory}
            onChange={handleCategory}
            label="Category"
          >
            {selectOptions.slice(1).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button
          disabled={
            !isItemNameValid ||
            !isLinkValid ||
            !isPriceValid ||
            itemName.length === 0 ||
            itemLink.length === 0 ||
            !itemCategory
          }
          variant="contained"
          onClick={() => onAdd()}
        >
          Add
        </Button>
        <Button onClick={clearTextFields}>Clear</Button>
      </Box>
      <ListOfItems
        setIsItemNameValid={setIsItemNameValid}
        setIsLinkValid={setIsLinkValid}
        onAdd={onAdd}
      />
    </>
  );
};

export default AddItem;
