import "./Mine.scss";

import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { Paper } from "@olympusdao/component-library";
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
          <Paper className="ohm-card">
            <Grid></Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default memo(Mine);
