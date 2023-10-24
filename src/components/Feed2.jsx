import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { TextField, Button } from "@mui/material";

const Feed = () => {
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box sx={{ flex: 4, padding: 2 }}>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleInputChange}
        />
        {inputValue}
      </Box>
    </Box>
  );
};

export default Feed;
