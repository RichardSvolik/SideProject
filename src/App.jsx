import { useState, createContext } from "react";
import { Box, Stack } from "@mui/material";
import Feed from "./components/Feed";
import AddItem from "./components/AddItem";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Topbar";
import Rightbar from "./components/Rightbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const UserContext = createContext();

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  // console.log("items: ", items);
  return (
    <BrowserRouter basename="">
      <Box>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <Routes>
            <Route path="/feed" element={<Feed items={items} />} />
            <Route path="/Rightbar" element={<Rightbar />} />
            <Route
              path="/AddItem"
              element={<AddItem items={items} setItems={setItems} />}
            />
          </Routes>
          <Rightbar />
        </Stack>
      </Box>
    </BrowserRouter>
  );
}

export default App;
