// eslint-disable-next-line simple-import-sort/imports
import "./style.scss";
import { useLocation } from "react-router-dom";

import Logo from "../../assets/images/logo-4.png";
import LogoCoin from "../../assets/images/logo-3.png";
import Twitter from "../../assets/icons/twitter.svg";
import Telegram from "../../assets/icons/telegram.svg";
import Github from "../../assets/icons/github.svg";
import AndSoOn from "../../assets/icons/medium.svg";

import { Container, useMediaQuery, Link, Typography, Button } from "@material-ui/core";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const location = useLocation();
  const isFoundation = location.pathname === "/foundation";

  return (
    <div>
      <div className="fixed-header">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="header-left">
            <img
              src={isFoundation ? LogoCoin : Logo}
              alt="MBTC"
              className={isFoundation ? "header-logo-coin" : "header-logo"}
            />
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
          <div className="header-right">
            <Link href={window.location.origin + "/#/dashboard"} target="_blank" underline="none">
              <Button variant="contained" className="header-btn">
                Enter App
              </Button>
            </Link>
          </div>
        </Container>
      </div>
      {children}
      <div className="bottom">
        <Typography variant="h4" align="center" className="bottom-title">
          Get more out of
          <br />
          MetaBitcoin
        </Typography>
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "2rem" : "4rem",
            paddingBottom: isSmallScreen || isVerySmallScreen ? "2rem" : "4rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="header-left">
            <img src={Logo} alt="MBTC" className="header-logo" />
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
            <Link href="#/home" underline="none">
              <img src={Twitter} alt="" />
            </Link>
            <Link href="#/home" underline="none">
              <img src={Telegram} alt="" />
            </Link>
            <Link href="#/home" underline="none">
              <img src={Github} alt="" />
            </Link>
            <Link href="#/home" underline="none">
              <img src={AndSoOn} alt="" />
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
