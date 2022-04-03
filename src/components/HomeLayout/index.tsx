// eslint-disable-next-line simple-import-sort/imports
import "./style.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Logo from "../../assets/images/logo-4.png";
import LogoCoin from "../../assets/images/logo-3.png";
import Twitter from "../../assets/icons/twitter.svg";
import Telegram from "../../assets/icons/telegram.svg";
import Github from "../../assets/icons/github.svg";
import AndSoOn from "../../assets/icons/medium.svg";
import MenuClose from "../../assets/icons/nav-close.svg";

import {
  AppBar,
  Container,
  useMediaQuery,
  Link,
  Typography,
  Toolbar,
  Box,
  // Menu,
  // MenuItem,
  Collapse,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Menu as MenuIcon } from "@material-ui/icons";
import Headroom from "headroom.js";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const location = useLocation();
  const isFoundation = location.pathname === "/foundation";

  const [zoomed, setZoomed] = useState(false);

  const [anchorElNav, setAnchorElNav] = useState(false);

  useEffect(() => {
    const header: HTMLElement = document.querySelector(".fixed-header") as HTMLElement;
    const headroom = new Headroom(header);
    headroom.init();
  }, []);

  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const links = [
    {
      name: "MBTC",
      href: "#/home",
    },
    {
      name: "Economy",
      href: "#/economy",
    },
    {
      name: "Foundation",
      href: "#/foundation",
    },
  ];

  return (
    <div className={`home ${isSmallScreen ? "isMobile" : ""} `}>
      <AppBar className="fixed-header">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
          }}
        >
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap style={{ lineHeight: 1 }}>
              <img src={isFoundation ? LogoCoin : Logo} alt="MBTC" className="header-logo" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {links.map(link => (
                <Link href={link.href} underline="none" key={link.name} onClick={handleCloseNavMenu}>
                  <Typography variant="h6">{link.name}</Typography>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: "flex", md: "none" } }}>
              {anchorElNav ? (
                <Box onClick={handleCloseNavMenu}>
                  <img src={MenuClose} alt="MBTC" className="menu-icon-close" />
                </Box>
              ) : (
                <MenuIcon aria-haspopup="true" onClick={handleOpenNavMenu} className="menu-icon"></MenuIcon>
              )}
            </Box>
            {!isSmallScreen ? (
              <Box>
                <Link href={window.location.origin + ""} underline="none">
                  <Button variant="contained" className="header-btn">
                    Enter App
                  </Button>
                </Link>
              </Box>
            ) : null}
          </Toolbar>
          {isSmallScreen ? (
            <Collapse in={Boolean(anchorElNav)}>
              <Box>
                {links.map(link => (
                  <Box key={link.name} onClick={handleCloseNavMenu} className="moblie-menu-item">
                    <Link underline="none" href={link.href}>
                      <Typography className="moblie-menu-text">{link.name}</Typography>
                    </Link>
                  </Box>
                ))}
              </Box>
              <Box className="modile-enter-app-box">
                <Link href={window.location.origin + ""} underline="none">
                  <Button variant="contained" className="header-btn">
                    Enter App
                  </Button>
                </Link>
              </Box>
            </Collapse>
          ) : null}
        </Container>
      </AppBar>
      {children}
      <div className="bottom">
        <Typography variant="h4" align="center" className="bottom-title">
          Get more out of
          <br />
          MetaBitcoin
        </Typography>
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "2rem" : "4rem",
            paddingBottom: isSmallScreen || isVerySmallScreen ? "2rem" : "4rem",
            display: isSmallScreen ? "block" : "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="header-left">
            <img src={isFoundation ? LogoCoin : Logo} alt="MBTC" className="header-logo" />
            <Link href="#/home" underline="none">
              <Typography variant="h6">MBTC</Typography>
            </Link>
            <Link href="#/economy" underline="none">
              <Typography variant="h6">Economy</Typography>
            </Link>
            <Link href="#/foundation" underline="none">
              <Typography variant="h6">Foundation</Typography>
            </Link>
          </div>
          <div className="social-link">
            <Link href="https://twitter.com/MetaMBTC" target={"_blank"} underline="none">
              <img src={Twitter} alt="" />
            </Link>
            <Link href="https://t.me/MetaMBTC" target={"_blank"} underline="none">
              <img src={Telegram} alt="" />
            </Link>
            <Link href="https://github.com/meta-btc" target={"_blank"} underline="none">
              <img src={Github} alt="" />
            </Link>
            <Link href="https://medium.com/@MetaBitcoin" target={"_blank"} underline="none">
              <img src={AndSoOn} alt="" />
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
