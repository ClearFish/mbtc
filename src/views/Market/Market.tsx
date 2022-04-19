import "./Market.scss";
import { memo, useState, useEffect } from "react";
import MarketLogo from "./assets/images/market-logo.png";
import MarketDemoIcon from "./assets/images/demo.png";
import { useMediaQuery, Grid, Link } from "@material-ui/core";
const Market: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const [cardArr, setCardArr] = useState<number[]>([]);
  useEffect(() => {
    setCardArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  return (
    <div id="market-view">
      <div
        className="banner-view"
        style={{
          height: isSmallScreen || isVerySmallScreen ? "auto" : "28rem",
        }}
      >
        <div
          className="market-desc"
          style={{
            width: isSmallScreen || isVerySmallScreen ? "100%" : "25rem",
            position: isSmallScreen || isVerySmallScreen ? "unset" : "absolute",
          }}
        >
          <div className="title">META BITCOIN NFT</div>
          <div className="desc">NFT Miner mines MBTC by providing hash power using proof-of-NFT</div>
        </div>
        <div
          className="banner-icon"
          style={{
            width: isSmallScreen || isVerySmallScreen ? "100%" : "23rem",
            position: isSmallScreen || isVerySmallScreen ? "unset" : "absolute",
            height: isSmallScreen || isVerySmallScreen ? "auto" : "280px",
          }}
        >
          <img src={MarketLogo} alt="" />
        </div>
      </div>
      <div
        className="layout-market"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "1.4rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "1.4rem",
        }}
      >
        <div
          className="btc-container"
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          }}
        >
          <Grid container className="title-container">
            <Grid item xs={12} md={8}>
              <div
                className="select-box"
                style={{
                  width: isSmallScreen || isVerySmallScreen ? "100%" : "25rem",
                  marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "0",
                }}
              >
                <div className="select-item">Open Market</div>
                <div className="select-item">New Releases</div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              justifyContent="flex-end"
              style={{
                display: "flex",
              }}
            >
              <div className="view-box">view all</div>
            </Grid>
          </Grid>
          <div className="btc-card-box">
            {cardArr.map(el => {
              return (
                <Link href={`#/marketDetail/${el}`} underline="none">
                  <div className="btc-card-item" key={el}>
                    <div className="btc-card-item-img">
                      <img src={MarketDemoIcon} alt="" />
                    </div>
                    <div className="btc-card-item-title">Meta Bitcoin NFT</div>
                    <div className="btc-card-item-desc">Asking price</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Market);
