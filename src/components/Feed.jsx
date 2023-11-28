/* eslint-disable react/prop-types */
import { useContext } from "react";
import { itemContext } from "../App";
import { Box } from "@mui/material";
import Post from "./Post";

const Feed = () => {
  const { items } = useContext(itemContext);

  return (
    <Box sx={{ flex: 4, padding: 2 }}>
      {items.map((item, index) => (
        <Post
          key={index}
          itemName={item.itemName}
          itemLink={item.itemLink}
          itemImage={item.itemImage}
          itemPrice={item.itemPrice}
          itemCategory={item.itemCategory}
          itemId={item.itemId}
          assignedTo={item.assignedTo}
          // setItems={setItems}
          item={item}
        />
      ))}
      {/* <Post items={items} /> */}
    </Box>
  );
};

export default Feed;
