import { Toolbar, Typography } from "@mui/material";

export default function TableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%", textAlign: "center" }}
        variant="h6"
        id="tableTitle"
        component="div"
        data-testid="header"
      >
        StackOverflow Tags Viewer
      </Typography>
    </Toolbar>
  );
}
