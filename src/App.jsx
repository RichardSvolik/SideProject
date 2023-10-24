import { Box, Stack } from "@mui/material";
import Feed from "./components/Feed";
import Feed2 from "./components/Feed2";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Topbar";
import Rightbar from "./components/Rightbar";
import Add from "./components/Add";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        {/* <button
            onClick={() =>
              setThemeValue((prev) => (prev === "dark" ? "light" : "dark"))
            }
          >
            lala {themeValue}
          </button> */}
        <Sidebar />
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/people" element={<Rightbar />} />
          <Route path="/feed2" element={<Feed2 />} />
        </Routes>
        <Rightbar />
      </Stack>
      <Add></Add>
    </Box>
  );
}

export default App;
