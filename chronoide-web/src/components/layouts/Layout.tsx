import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import { Box, Stack } from "@mui/material";

function Layout() {
  return (
    <Stack
      sx={{
        height: "inherit",
        backgroundColor: (theme) => theme.palette.background.default,
      }}>
      <Header />
      <Box flex={1}>
        <Outlet />
      </Box>
    </Stack>
  );
}

export default Layout;
