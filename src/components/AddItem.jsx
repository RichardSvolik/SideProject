import { useEffect, useContext, useReducer } from "react";

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
import { itemContext } from "../context/itemContext";
import { setFireStoreData } from "./data/firestore";

const initialState = {
  itemName: "",
  itemLink: "",
  itemImage: "",
  itemCategory: "",
  itemPrice: "",
  isItemNameValid: false,
  isLinkValid: false,
  isPriceValid: false,
};

const validateLink = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const createValidatedAttributes = (item) => {
  return {
    isItemNameValid: Boolean(item.itemName.length),
    isLinkValid: validateLink(item.itemLink),
    isPriceValid: item.itemPrice > 0 && !isNaN(item.itemPrice),
  };
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "UPDATE_ITEM":
      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...prevState,
        [action.data.attribute]: action.data.value,
      };
      return {
        ...newState,
        ...createValidatedAttributes(newState),
      };
    case "CLEAR_TEXT_FIELDS":
      return { ...initialState };
    default:
      return prevState;
  }
};

const AddItem = () => {
  const { items, setItems, selectOptions } = useContext(itemContext);
  const filteredOptions = selectOptions.filter((option) => !option.isAll);

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    itemName,
    itemLink,
    itemImage,
    itemCategory,
    itemPrice,
    isItemNameValid,
    isLinkValid,
    isPriceValid,
  } = state;

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
    dispatch({
      type: "CLEAR_TEXT_FIELDS",
    });
  };

  useEffect(() => {
    setFireStoreData(items);
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
          onChange={(event) =>
            dispatch({
              type: "UPDATE_ITEM",
              data: { attribute: "itemName", value: event.target.value },
            })
          }
        />
        <TextField
          error={!isLinkValid}
          helperText={!isLinkValid ? "invalid link" : ""}
          id="item-link"
          label="Item Link"
          value={itemLink}
          variant="outlined"
          onChange={(event) =>
            dispatch({
              type: "UPDATE_ITEM",
              data: { attribute: "itemLink", value: event.target.value },
            })
          }
        />
        <TextField
          id="item-image"
          label="Image Link"
          value={itemImage}
          variant="outlined"
          onChange={(event) =>
            dispatch({
              type: "UPDATE_ITEM",
              data: { attribute: "itemImage", value: event.target.value },
            })
          }
        />
        <TextField
          error={!isPriceValid}
          helperText={!isPriceValid ? "insert a number" : ""}
          id="item-price"
          label="Price"
          value={itemPrice}
          variant="outlined"
          onChange={(event) =>
            dispatch({
              type: "UPDATE_ITEM",
              data: { attribute: "itemPrice", value: event.target.value },
            })
          }
        />
        <FormControl>
          <InputLabel id="item-select-category">Category</InputLabel>
          <Select
            error={!itemCategory}
            sx={{ minWidth: 195 }}
            value={itemCategory}
            onChange={(event) =>
              dispatch({
                type: "UPDATE_ITEM",
                data: { attribute: "itemCategory", value: event.target.value },
              })
            }
            label="Category"
          >
            {filteredOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
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
        <Button
          onClick={() =>
            dispatch({
              type: "CLEAR_TEXT_FIELDS",
            })
          }
        >
          Clear
        </Button>
      </Box>
      <ListOfItems />
    </>
  );
};

export default AddItem;
