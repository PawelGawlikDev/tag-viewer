import React from "react";
import "./App.css";
import TagsTable from "./components/TagsTable/TagsTable";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        top: "50px",
        position: "relative",
      }}
    >
      <TagsTable />
    </Box>
  );
}

export default App;
