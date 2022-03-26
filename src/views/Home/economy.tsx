import "./styles.scss";
import { useEffect } from "react";

import MetaBitcon from "../../assets/images/meta-bitcoin.png";
import { Container, useMediaQuery, Typography, Grid } from "@material-ui/core";
import CardMBTC from "../../assets/images/card-mbtc2.png";
import CardMFUEL from "../../assets/images/card-mfuel2.png";
import CardMINER from "../../assets/images/card-miner2.png";
import CardPOOL from "../../assets/images/card-pool2.png";
import { useLocation } from "react-router-dom";

const srcollToAnchor = (anchorName: string) => {
  if (anchorName) {
    const anchorElement = document.getElementById(anchorName);
    if (anchorElement) {
      anchorElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }
};

export function Economy() {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash) {
      srcollToAnchor(hash);
    }
  }, [location]);

  return (
    <>
      <div className="block1 economy">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "8rem" : "13rem",
            position: "relative",
          }}
        >
          <video src={window.location.origin + "/economy.mp4"} muted autoPlay loop className="coin-vedio"></video>
          <div className="block-left">
            <img src={MetaBitcon} alt="" className="meta-img" />
            <Typography variant="body1" align="left" className="tng-text">
              An innovative peer-to-peer financial system in the metaverse
            </Typography>
          </div>
        </Container>
      </div>
      <div className="block4">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingTop: "1rem",
            paddingBottom: "8rem",
          }}
          id="mbtc"
        >
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={5}>
              <Typography variant="body1" align="right" className="card-text">
                MBTC
              </Typography>
              <Typography variant="body2" align="right" className="card-info">
                Meta Bitcoin provides a decentralized way to store,
                <br /> account, and exchange values in the metaverse
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <img src={CardMBTC} className="card-img"></img>
            </Grid>
            <Grid item xs={7} id="mfuel">
              <img src={CardMFUEL} className="card-img"></img>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left" className="card-text">
                MFuel
              </Typography>
              <Typography variant="body2" align="left" className="card-info">
                Meta Fuel is the energy resource for mining in the metaverse
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="right" className="card-text">
                NFT Miner
              </Typography>
              <Typography variant="body2" align="right" className="card-info">
                NFT Miner mines MBTC by providing hash power
                <br />
                using proof-of-NFT
              </Typography>
            </Grid>
            <Grid item xs={7} id="miner">
              <img src={CardMINER} className="card-img"></img>
            </Grid>
            <Grid item xs={7} id="pool">
              <img src={CardPOOL} className="card-img"></img>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left" className="card-text">
                NFT Pool
              </Typography>
              <Typography variant="body2" align="left" className="card-info">
                NFT Pool empowers miners by receiving and burning MFuels
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
