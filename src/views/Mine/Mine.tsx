import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";

import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
// import { Paper } from "@olympusdao/component-library";
import { Container, useMediaQuery, Box, Grid } from "@material-ui/core";

const Mine: React.FC = () => {
  const history = useHistory();
  const { networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "mine", networkID: networkId, history });

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  return (
    <div id="mine-view">
      <Container
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
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
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "1.4rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "1.4rem",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className="ohm-card-mine">xs=12</Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default memo(Mine);
