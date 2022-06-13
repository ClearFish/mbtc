import "./styles.scss";
import { useEffect } from "react";
import { t, Trans } from "@lingui/macro";
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
    <div className={isSmallScreen ? "isMobile" : ""}>
      <div className="block1 economy">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "6rem" : "13rem",
            position: "relative",
          }}
        >
          <video
            src={window.location.origin + (isSmallScreen ? "/economy-mobile.mp4" : "/economy.mp4")}
            muted
            autoPlay
            loop
            controls={false}
            playsInline={true}
            className="coin-vedio"
          ></video>
          <div className="block-left">
            <img src={MetaBitcon} alt="" className="meta-img" />
            <Typography variant="body1" align="left" className="tng-text">
              <Trans>An innovative peer-to-peer financial system in the metaverse</Trans>
            </Typography>
          </div>
        </Container>
      </div>
      <div className="block4">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: "1rem",
            paddingBottom: isSmallScreen || isVerySmallScreen ? "4rem" : "8rem",
          }}
          id="mbtc"
        >
          {isSmallScreen ? (
            <Grid>
              <Grid item xs={12}>
                <img src={CardMBTC} className="card-img"></img>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1" align="left" className="card-text">
                  {t`MBTC`}
                </Typography>
                <Typography variant="body2" align="left" className="card-info">
                  {t`Meta Bitcoin provides a decentralized way to store, account, and exchange values in the metaverse`}
                </Typography>
              </Grid>
              <Grid xs={12} id="mfuel">
                <img src={CardMFUEL} className="card-img"></img>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1" align="left" className="card-text">
                  {t`MFuel`}
                </Typography>
                <Typography variant="body2" align="left" className="card-info">
                  {t`Meta Fuel is the energy resource for mining in the metaverse`}
                </Typography>
              </Grid>
              <Grid xs={12} id="miner">
                <img src={CardMINER} className="card-img"></img>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1" align="left" className="card-text">
                  {t`NFT Miner`}
                </Typography>
                <Typography variant="body2" align="left" className="card-info">
                  {t`NFT Miner mines MBTC by providing hash power`}
                  {isSmallScreen ? " " : <br />}
                  {t`using proof-of-NFT`}
                </Typography>
              </Grid>
              <Grid xs={12} id="pool">
                <img src={CardPOOL} className="card-img"></img>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1" align="left" className="card-text">
                  {t`NFT Pool`}
                </Typography>
                <Typography variant="body2" align="left" className="card-info">
                  {t`NFT Pool empowers miners by receiving and burning MFuels`}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container alignItems="center" spacing={6}>
              <Grid item xs={5}>
                <Typography variant="body1" align="right" className="card-text">
                  {t`MBTC`}
                </Typography>
                <Typography variant="body2" align="right" className="card-info">
                  {t`Meta Bitcoin provides a decentralized way to store,`}
                  <br /> {t`account, and exchange values in the metaverse`}
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
                  {t`MFuel`}
                </Typography>
                <Typography variant="body2" align="left" className="card-info">
                  {t`Meta Fuel is the energy resource for mining in the metaverse`}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body1" align="right" className="card-text">
                  {t`NFT Miner`}
                </Typography>
                <Typography variant="body2" align="right" className="card-info">
                  {t`NFT Miner mines MBTC by providing hash power`}
                  <br />
                  {t`using proof-of-NFT`}
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
                  {t`NFT Pool`}
                </Typography>
                <Typography variant="body2" align="left" className="card-info">
                  {t`NFT Pool empowers miners by receiving and burning MFuels`}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Container>
      </div>
    </div>
  );
}
