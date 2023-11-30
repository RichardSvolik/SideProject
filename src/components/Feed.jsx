/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { itemContext } from "../App";
import { Box } from "@mui/material";
import Post from "./Post";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Feed = () => {
  const { items } = useContext(itemContext);

  const [isAscending, setIsAscending] = useState();
  const [filteredItems, setFilteredItems] = useState(items);
  const [isAssignedFilterHidden, setIsAssignedFilterHidden] = useState(false);

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
    console.log(items);
    if (isAscending) {
      filteredItems.sort((a, b) => a.itemPrice - b.itemPrice);
      setIsAscending(false);
    } else {
      filteredItems.sort((a, b) => b.itemPrice - a.itemPrice);
      setIsAscending(true);
    }
    console.log(items);
  };

  const showUnasigned = () => {
    if (filteredItems.length === items.length) {
      const newFilteredItems = items.filter(
        (item) => item.assignedTo.name === ""
      );
      setFilteredItems(newFilteredItems);
      setIsAssignedFilterHidden(true);
      console.log(newFilteredItems);
    } else {
      setFilteredItems(items);
      setIsAssignedFilterHidden(false);
      console.log(items);
    }
  };

  return (
    <Box sx={{ flex: 4, padding: 2 }}>
      <Box sx={{ flex: 4, padding: 2 }}>
        <SortingButton sx={{ marginRight: "20px" }} onClick={sortByPrice}>
          Price {isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </SortingButton>
        <SortingButton onClick={showUnasigned} sx={{ width: "230px" }}>
          {isAssignedFilterHidden ? "Show all" : "Show only available"}
        </SortingButton>
      </Box>
      <Box sx={{ flex: 4, padding: 2 }}>
        {filteredItems.map((item, index) => (
          <Post
            key={index}
            itemName={item.itemName}
            itemLink={item.itemLink}
            itemImage={item.itemImage}
            itemPrice={item.itemPrice}
            itemCategory={item.itemCategory}
            id={item.id}
            assignedTo={item.assignedTo}
            // setItems={setItems}
            item={item}
          />
        ))}
        {/* <Post items={items} /> */}
      </Box>
    </Box>
  );
};

export default Feed;
