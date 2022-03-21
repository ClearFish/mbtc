// eslint-disable-next-line simple-import-sort/imports
import "./style.scss";

import Logo from "../../assets/images/mbtc-logo.png";
import Twitter from "../../assets/images/twitter.png";
import Telegram from "../../assets/images/telegram.png";
import Github from "../../assets/images/github.png";
import AndSoOn from "../../assets/images/andsoon.png";

import { Container, useMediaQuery, Link, Typography, Button } from "@material-ui/core";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const enterHandler = () => {
    // window.open(window.location.origin + "/#/dashboard");
  };

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
          <div className="header-right">
            <Link underline="none">
              <Button variant="contained" className="header-btn" onClick={enterHandler}>
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
