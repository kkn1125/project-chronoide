import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { MouseEvent, useState } from "react";
import Logo from "../../atoms/Logo";
import MenuFlatList from "../../moleculars/MenuFlatList";
import MenuMobileList from "../../moleculars/MenuMobileList";
import MenuSettingsList from "../../moleculars/MenuSettingsList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chronoTreeState } from "../../../recoils/chrono.state";
import { ChronoTree } from "../../../models/ChronoTree";

const pages: NavigateOption[] = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
];

function Header() {
  const setChronoTree = useSetRecoilState(chronoTreeState);
  const chronoTree = useRecoilValue(chronoTreeState);
  const settings: NavigateActOption[] = [
    {
      name: "save",
      action: () => {
        chronoTree.saveLocalStorage();
      },
    },
    {
      name: "load",
      action: () => {
        chronoTree.loadLocalStorage();
        setChronoTree((chronoTree) => {
          const newChronoTree = new ChronoTree();
          newChronoTree.childrens = [...chronoTree.childrens];
          return newChronoTree;
        });
      },
    },
  ];
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo name="Chronoide" ismd />
          <MenuMobileList
            anchorElNav={anchorElNav}
            pages={pages}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />

          <Logo name="Chronoide" />
          <MenuFlatList pages={pages} handleCloseNavMenu={handleCloseNavMenu} />

          <MenuSettingsList
            anchorElUser={anchorElUser}
            settings={settings}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
