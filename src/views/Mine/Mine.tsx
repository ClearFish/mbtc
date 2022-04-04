import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";
import CardBanner from "../../assets/images/mine/card-banner.png";

import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
// import { Paper } from "@olympusdao/component-library";
import { Container, useMediaQuery, Box, Grid, Typography } from "@material-ui/core";

const Mine: React.FC = () => {
  const history = useHistory();
  const { networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "mine", networkID: networkId, history });

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  return (
    <div id="mine-view">
      <Container
        className="hero-banner-container"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
        }}
      >
        <Box className="hero-metrics">
          <Grid xs={12} md={12}>
            <Box className="ohm-card-mine">
              <img className="card-banner" src={MineBanner} />
            </Box>
          </Grid>
        </Box>
      </Container>
      <Box
        className="btc-item-container"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          marginLeft: isSmallScreen || isVerySmallScreen ? "0" : "1.6rem",
          marginRight: isSmallScreen || isVerySmallScreen ? "0" : "1.6rem",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className="btc-item-title-container">
              <Grid container spacing={3}>
                <Grid item md={6} lg={8} xs={12}>
                  <Typography
                    className="btc-item-title"
                    style={{
                      textAlign: isSmallScreen || isVerySmallScreen ? "center" : "left",
                      paddingTop: isSmallScreen || isVerySmallScreen ? "0" : "0.6rem",
                    }}
                  >
                    Staked Miners
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  lg={4}
                  xs={12}
                  style={{ padding: isSmallScreen || isVerySmallScreen ? "0" : "0.3rem" }}
                >
                  <Box className="btc-item-right-container">
                    <Box className="btc-item-right-btn">Stake Miners</Box>
                    <Box className="btc-item-right-btn">Untake Miners</Box>
                    <Box className="btc-item-right-btn">Unstake All</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
              paddingRight: isSmallScreen || isVerySmallScreen ? ".3rem" : "1.4rem",
              paddingTop: "1.6rem",
              paddingBottom: "1.6rem",
            }}
          >
            {/* 卡片 start */}
            <Box
              className="btc-card-item"
              style={{
                marginRight: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
              }}
            >
              <Box className="btc-card-item-img">
                <img src={CardBanner} alt="" />
              </Box>
              <Box className="btc-card-item-desc">
                <Box className="btc-card-item-desc-title">Meta Bitcoin NFT</Box>
                <Box className="btc-card-item-desc-price-box">
                  <Box
                    className="btc-card-item-desc-price-item"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <Box className="item-title">MBTC Mined</Box>
                      <Box className="item-price">100.53</Box>
                    </Box>
                    <div className={`btn ${true ? "orange" : "blue"}`}>Harvest</div>
                  </Box>
                  <Box
                    className="btc-card-item-desc-price-item"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <Box className="item-title">MBTC Mined</Box>
                      <Box className="item-price">100.53</Box>
                    </Box>
                    <div className={`btn ${false ? "orange" : "blue"}`}>Harvest</div>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* 卡片 end */}
            {/* 卡片 start */}
            <Box
              className="btc-card-item"
              style={{
                marginRight: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
              }}
            >
              <Box className="btc-card-item-img">
                <img src={CardBanner} alt="" />
              </Box>
              <Box className="btc-card-item-desc">
                <Box className="btc-card-item-desc-title">Meta Bitcoin NFT</Box>
                <Box className="btc-card-item-desc-price-box">
                  <Box
                    className="btc-card-item-desc-price-item"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <Box className="item-title">MBTC Mined</Box>
                      <Box className="item-price">100.53</Box>
                    </Box>
                    <div className={`btn ${true ? "orange" : "blue"}`}>Harvest</div>
                  </Box>
                  <Box
                    className="btc-card-item-desc-price-item"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <Box className="item-title">MBTC Mined</Box>
                      <Box className="item-price">100.53</Box>
                    </Box>
                    <div className={`btn ${false ? "orange" : "blue"}`}>Harvest</div>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* 卡片 end */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default memo(Mine);
