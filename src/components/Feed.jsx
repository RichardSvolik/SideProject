/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import Post from "./Post";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { itemContext } from "../context/itemContext";

const Feed = () => {
  const { selectOptions } = useContext(itemContext);
  const SortingButton = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
    margin: "50x",
  });

  const { items } = useContext(itemContext);

  const [isAscending, setIsAscending] = useState();
  const [searchedValue, setSearchedValue] = useState("");
  const [checkedAvailable, setChecked] = useState(false);
  const [itemCategory, setItemCategory] = useState(selectOptions[0].label);

  const handleShowAvailableSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const sortByPrice = () => {
    if (isAscending) {
      setIsAscending(false);
    } else {
      setIsAscending(true);
    }
  };

  const handleSearch = (event) => {
    setSearchedValue(event.target.value.toLowerCase());
  };

  const handleSelect = (event) => {
    setItemCategory(event.target.value);
  };

  const filterByAvailable = (item) => {
    if (!checkedAvailable) {
      return true;
    }
    return !item.assignedTo.name;
  };

  const filterBySearch = (item) =>
    item.itemName.toLowerCase().includes(searchedValue.toLowerCase());

  const filterByCategory = (item) => {
    if (itemCategory.includes(selectOptions[0].label)) {
      return true;
    } else {
      return item.itemCategory.includes(itemCategory);
    }
  };

  const getFinalItems = () => {
    return items
      .filter(
        (item) =>
          filterByAvailable(item) &&
          filterBySearch(item) &&
          filterByCategory(item)
      )
      .sort((a, b) => {
        if (isAscending) {
          return a.itemPrice - b.itemPrice;
        }
        return b.itemPrice - a.itemPrice;
      });
  };

  return (
    <Box>
      <Box>
        <TextField
          sx={{ width: "100%", paddingBottom: 2 }}
          label="Search"
          variant="outlined"
          onChange={handleSearch}
          value={searchedValue}
        ></TextField>
      </Box>
      <Box>
        <SortingButton sx={{ marginRight: "20px" }} onClick={sortByPrice}>
          Price {isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </SortingButton>
        <Select
          sx={{ minWidth: 195, marginTop: 2 }}
          value={itemCategory}
          onChange={handleSelect}
        >
          {selectOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={
            <Switch
              color="warning"
              checked={checkedAvailable}
              onChange={handleShowAvailableSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Show only available"
          labelPlacement="start"
        />
      </Box>
      <Box>
        {getFinalItems().length ? (
          getFinalItems().map((item) => (
            <Post
              key={item.id}
              itemName={item.itemName}
              itemLink={item.itemLink}
              itemImage={item.itemImage}
              itemPrice={item.itemPrice}
              itemCategory={item.itemCategory}
              id={item.id}
              assignedTo={item.assignedTo}
              item={item}
            />
          ))
        ) : (
          <Typography sx={{ p: 4 }} variant="h4" color="textSecondary">
            Nothing here
            <Typography variant="h5" color="textSecondary">
              Go somwhere else
            </Typography>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Feed;
