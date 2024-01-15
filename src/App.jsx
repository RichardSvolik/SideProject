import { useState, createContext } from "react";
import { Box, Stack, AppBar } from "@mui/material";
import Feed from "./components/Feed";
import AddItem from "./components/AddItem";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
// import Rightbar from "./components/Rightbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export const itemContext = createContext();
// ^ Should be in a separate file 
// App.js is an entrypoint to your application and it calls all other components
// however, in the deeper components you also import context from App.js
// so there is a circular dependency: App.js –> Component > App.js

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const selectOptions = [
    { label: "All Categories", value: "All Categories" },
    // Label and value are the same, maybe it's obsolete
    { label: "Electronics", value: "Electronics" },
    { label: "Food", value: "Food" },
    { label: "Other", value: "Other" },
  ];

  return (
    <BrowserRouter basename="">
      {/* ^^ it's a good practice to use a process variable to set basename, so you can upload the application on different urls */}
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
                  // ^ I think that top: 80 should also work
                >
                  <Sidebar />
                </AppBar>
              </Box>
              {/* Some uncommented code here */}
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
