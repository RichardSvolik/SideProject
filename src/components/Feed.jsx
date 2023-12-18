/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Box, TextField } from "@mui/material";
import Post from "./Post";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { itemContext } from "../App";

const Feed = () => {
  const { items } = useContext(itemContext);

  const [isAscending, setIsAscending] = useState();

  const [searchedValue, setSearchedValue] = useState("");
  const [finalItems, setFinalItems] = useState(items);

  const [showAvailableButton, setShowAvailableButton] = useState(true);

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

  const sortByPrice = () => {
    if (isAscending) {
      finalItems.sort((a, b) => a.itemPrice - b.itemPrice);
      setIsAscending(false);
    } else {
      finalItems.sort((a, b) => b.itemPrice - a.itemPrice);
      setIsAscending(true);
    }
  };

  const toggleAvailableButon = () => {
    setShowAvailableButton((previous) => !previous);
  };

  const showOnlyAvailable = () => {
    const filteredAvailable = items.filter(
      (item) => item.assignedTo.name === ""
    );
    const finalFilter = filteredAvailable.filter((item) =>
      item.itemName.toLowerCase().includes(searchedValue)
    );
    console.log(finalFilter);
    setFinalItems(finalFilter);
    toggleAvailableButon();
  };

  const showAll = () => {
    if (searchedValue) {
      const newSearchItems = items.filter((item) =>
        item.itemName.toLowerCase().includes(searchedValue.toLowerCase())
      );
      console.log(newSearchItems);
      setFinalItems(newSearchItems);
    } else {
      setFinalItems(items);
    }
    toggleAvailableButon();
  };

  const handleSearch = (event) => {
    setSearchedValue(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setFinalItems(
      items.filter((item) =>
        item.itemName.toLowerCase().includes(searchedValue.toLowerCase())
      )
    );
  }, [searchedValue, items]);

  return (
    <Box
      sx={{
        flex: 2,
        padding: 2,
        paddingRight: "10%",
        display: "block",
        justifyContent: "center",
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
      {showAvailableButton && (
        <SortingButton onClick={showOnlyAvailable} sx={{ width: "230px" }}>
          Show only available
        </SortingButton>
      )}
      {!showAvailableButton && (
        <SortingButton onClick={showAll} sx={{ width: "230px" }}>
          Show all
        </SortingButton>
      )}
      {finalItems.map((item) => (
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
