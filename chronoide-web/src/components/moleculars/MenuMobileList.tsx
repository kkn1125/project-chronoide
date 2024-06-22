import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

interface MenuMobileListProps {
  anchorElNav: HTMLElement | null;
  pages: NavigateOption[];
  handleOpenNavMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
}

function MenuMobileList({
  anchorElNav,
  pages,
  handleOpenNavMenu,
  handleCloseNavMenu,
}: MenuMobileListProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: "flex",
          md: "none",
        },
      }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}>
        {pages.map((page) => (
          <MenuItem
            key={page.name}
            onClick={() => {
              handleCloseNavMenu();
              navigate(page.path);
            }}>
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MenuMobileList;
