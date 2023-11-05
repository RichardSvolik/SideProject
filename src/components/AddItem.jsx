import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { TextField, Button } from "@mui/material";
import ListOfItems from "./ListOfItems";

const Feed = ({ items, setItems }) => {
  const [itemName, setItemName] = useState();
  const [itemLink, setItemLink] = useState();
  const [itemImage, setItemImage] = useState();

  const [valueName, setValueName] = useState("");
  const [valueLink, setValueLink] = useState("");
  const [valueImage, setValueImage] = useState("");

  const [isItemNameValid, setIsItemNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);

  const validateItemName = (valueToValidate) => {
    const isValid = valueToValidate.length >= 1;
    isValid ? setIsItemNameValid(true) : setIsItemNameValid(false);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      setIsLinkValid(true);
    } catch (_) {
      setIsLinkValid(false);
    }
  };

  const handleItemName = (event) => {
    validateItemName(event.target.value);
    setItemName(event.target.value);
    setValueName(event.target.value);
  };

  const handleItemLink = (event) => {
    validateUrl(event.target.value);
    setItemLink(event.target.value);
    setValueLink(event.target.value);
  };

  const handleItemImage = (event) => {
    setItemImage(event.target.value);
    setValueImage(event.target.value);
  };

  const clearTextFields = () => {
    setValueLink("");
    setValueName("");
    setValueImage("");
  };

  const setInvalidState = () => {
    setIsLinkValid(false);
    setIsItemNameValid(false);
  };

  const onAdd = (itemName, itemLink, itemImage) => {
    setItems([
      ...items,
      {
        itemName: itemName,
        itemLink: itemLink,
        itemImage: itemImage,
        itemDate: new Date(),
        checked: false,
      },
    ]);
    clearTextFields();
    setInvalidState();
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
          value={valueName}
          onChange={handleItemName}
        />
        <TextField
          error={!isLinkValid}
          helperText={!isLinkValid ? "invalid link" : ""}
          id="outlined-basic"
          label="Link"
          value={valueLink}
          variant="outlined"
          onChange={handleItemLink}
        />
        <TextField
          id="outlined-basic"
          label="Image Link"
          value={valueImage}
          variant="outlined"
          onChange={handleItemImage}
        />
      </Box>
      <Box
        sx={{
          flex: 4,
          padding: 2,
        }}
      >
        <Button
          disabled={!isItemNameValid || !isLinkValid}
          variant="contained"
          onClick={() => onAdd(itemName, itemLink, itemImage)}
        >
          Add
        </Button>
        <Button onClick={clearTextFields}>Clear</Button>
      </Box>
      <Box
        sx={{
          flex: 4,
          padding: 2,
        }}
      >
        <ListOfItems
          items={items}
          setItems={setItems}
          setIsItemNameValid={setIsItemNameValid}
          setIsLinkValid={setIsLinkValid}
        />
      </Box>
    </Box>
  );
};

export default Feed;
