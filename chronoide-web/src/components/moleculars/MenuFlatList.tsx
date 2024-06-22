import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MenuFlatListProps {
  pages: NavigateOption[];
  handleCloseNavMenu: () => void;
}

function MenuFlatList({ pages, handleCloseNavMenu }: MenuFlatListProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: "none",
          md: "flex",
        },
      }}>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => {
            handleCloseNavMenu();
            navigate(page.path);
          }}
          sx={{
            my: 2,
            color: "white",
            display: "block",
          }}>
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

export default MenuFlatList;
