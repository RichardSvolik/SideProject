/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box } from "@mui/material";
import Post from "./Post";

const Feed = ({ items }) => {
  return (
    <Box sx={{ flex: 4, padding: 2 }}>
      {items.map((item, index) => (
        <Post
          key={index}
          // using index as a key is not safe https://blog.anja-stricker.de/why-using-index-as-key-in-reactjs-map-function-can-cause-problems-and-how-to-fix-them
          itemName={item.itemName}
          itemLink={item.itemLink}
          itemImage={item.itemImage}
          itemPrice={item.itemPrice}
          itemCategory={item.itemCategory}
        />
      ))}
      {/* <Post items={items} /> */}
    </Box>
  );
};

export default Feed;
