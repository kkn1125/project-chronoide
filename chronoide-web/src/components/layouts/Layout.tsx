import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";

function Layout() {
  return (
    <Stack
      sx={{
        height: "inherit",
      }}>
      <Header />
      <Stack
        flex={1}
        sx={{
          flex: 1,
          backgroundColor: (theme) => theme.palette.background.default,
        }}>
        <Outlet />
      </Stack>
    </Stack>
  );
}

export default Layout;
