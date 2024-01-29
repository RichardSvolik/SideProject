import { useState } from "react";
import { Box, Stack, AppBar } from "@mui/material";
import Feed from "./components/Feed";
import AddItem from "./components/AddItem";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { itemContext } from "./context/itemContext";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const selectOptions = [
    { label: "All Categories", value: "All Categories" },
    { label: "Electronics", value: "Electronics" },
    { label: "Food", value: "Food" },
    { label: "Other", value: "Other" },
  ];

  return (
    <BrowserRouter basename="">
      <itemContext.Provider value={{ items, setItems, selectOptions }}>
        <Topbar />
        <Stack direction="row" spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Box flexGrow={0}>
                <AppBar
                  elevation={0}
                  position="sticky"
                  sx={{ top: "80px", color: "black", backgroundColor: "white" }}
                >
                  <Sidebar />
                </AppBar>
              </Box>
              {/* <Sidebar /> */}
            </Box>
            <Box
              sx={{
                maxWidth: "1000px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Routes>
                <Route path="/feed" element={<Feed />} />
                <Route path="/" element={<Feed />} />
                {/* <Route path="/Rightbar" element={<Rightbar />} /> */}
                <Route path="/AddItem" element={<AddItem />} />
              </Routes>
            </Box>
          </Box>
          {/* <Rightbar /> */}
        </Stack>
      </itemContext.Provider>
      {/* </Box> */}
    </BrowserRouter>
  );
}

export default App;
