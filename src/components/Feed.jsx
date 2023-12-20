/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { Box, TextField, Switch, FormControlLabel } from "@mui/material";
import Post from "./Post";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { itemContext } from "../App";

const Feed = () => {
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

  const filterByAvailable = (item) => {
    if (!checkedAvailable) {
      return true;
    }
    return !item.assignedTo.name;
  };

  const filterBySearch = (item) =>
    item.itemName.toLowerCase().includes(searchedValue.toLowerCase());

  const getFinalItems = () => {
    return items
      .filter((item) => filterByAvailable(item) && filterBySearch(item))
      .sort((a, b) => {
        if (isAscending) {
          return a.itemPrice - b.itemPrice;
        }
        return b.itemPrice - a.itemPrice;
      });
  };

  return (
    <Box
      sx={{
        flex: 4,
        padding: 2,
        paddingRight: "10%",
        display: "block",
        justifyContent: "flex-start",
      }}
    >
      <TextField
        sx={{ width: "100%", paddingBottom: 2 }}
        label="Search"
        variant="outlined"
        onChange={handleSearch}
        value={searchedValue}
      ></TextField>
      <SortingButton sx={{ marginRight: "20px" }} onClick={sortByPrice}>
        Price {isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </SortingButton>
      <FormControlLabel
        control={
          <Switch
            checked={checkedAvailable}
            onChange={handleShowAvailableSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Show only available"
        labelPlacement="start"
      />

      {getFinalItems().map((item) => (
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
      ))}
    </Box>
  );
};

export default Feed;
