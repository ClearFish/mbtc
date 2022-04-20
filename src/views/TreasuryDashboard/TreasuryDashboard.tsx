import "./TreasuryDashboard.scss";

import { Box, Container, Grid, useMediaQuery, Zoom, Button, Typography } from "@material-ui/core";
import { Metric, MetricCollection, Paper } from "@olympusdao/component-library";
import { memo } from "react";

import { MarketValueGraph, TotalValueDepositedGraph } from "./components/Graph/Graph";
import {
  BackingPerOHM,
  CircSupply,
  CurrentIndex,
  EarnedMFuel,
  EarnedMFuelNetWorth,
  GOHMPrice,
  MarketCap,
  MBTCReward,
  MinedMBTC,
  MinedMBTCNetWorth,
  MyMiningHashRate,
  MyNFTMiners,
  MyNFTPools,
  OHMPrice,
  TotalMiningHashRate,
} from "./components/Metric/Metric";

import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";

import MBTC_LOGO from "./assets/mbtc-logo.png";
import MFUEL_LOGO from "./assets/mfuel-logo.png";
import TRANSFER from "./assets/transfer.png";

const sharedMetricProps: PropsOf<typeof Metric> = { labelVariant: "h6", metricVariant: "h5" };

const TreasuryDashboard = memo(() => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const history = useHistory();
  const { networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "dashboard", networkID: networkId, history });

  return (
    <div id="treasury-dashboard-view" className={`${isSmallScreen && "smaller"} ${isVerySmallScreen && "very-small"}`}>
      <Container
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
        }}
      >
        <Grid container spacing={2} className="data-grid">
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box className="hero-metrics">
              <Paper className="ohm-card">
                <MetricCollection>
                  <MarketCap {...sharedMetricProps} />
                  <OHMPrice {...sharedMetricProps} />
                  <CircSupply {...sharedMetricProps} />
                  <BackingPerOHM {...sharedMetricProps} />
                  <CurrentIndex {...sharedMetricProps} />
                  <GOHMPrice {...sharedMetricProps} className="wsoprice" />
                </MetricCollection>
              </Paper>
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box className="hero-metrics">
              <Paper className="ohm-card">
                <Grid container spacing={2}>
                  <Grid item className="card-pannel" justifyContent="space-between">
                    <img className="card-pannel-logo" src={MBTC_LOGO} alt="" />
                    <div className="transfer-pannel">
                      <div className="transfer-title">
                        <Typography variant="h6"> MBTC</Typography>
                        <img className="transfer-logo" src={TRANSFER}></img>
                        <Typography variant="h6"> USD</Typography>
                      </div>
                      <Typography variant="h5" className="transfer-content">
                        $100.00
                      </Typography>
                    </div>
                    <Button className="card-pannel-btn" variant="contained">
                      Buy
                    </Button>
                  </Grid>
                  <Grid item className="card-pannel">
                    <img className="card-pannel-logo" src={MFUEL_LOGO} alt="" />
                    <div className="transfer-pannel">
                      <div className="transfer-title">
                        <Typography variant="h6"> MBTC</Typography>
                        <img className="transfer-logo" src={TRANSFER}></img>
                        <Typography variant="h6"> USD</Typography>
                      </div>
                      <Typography variant="h5" className="transfer-content">
                        $100.00
                      </Typography>
                    </div>
                    <Button className="card-pannel-btn" variant="contained">
                      Buy
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} className="data-grid custom-layout">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box className="hero-metrics">
              <Paper className="ohm-card">
                <MetricCollection>
                  <MinedMBTC {...sharedMetricProps} />
                  <MinedMBTCNetWorth {...sharedMetricProps} />
                  <TotalMiningHashRate {...sharedMetricProps} />
                  <MyMiningHashRate {...sharedMetricProps} />
                  <MBTCReward {...sharedMetricProps} />
                  <EarnedMFuel {...sharedMetricProps} />
                  <EarnedMFuelNetWorth {...sharedMetricProps} />
                  <MyNFTMiners {...sharedMetricProps} />
                  <MyNFTPools {...sharedMetricProps} />
                </MetricCollection>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Zoom in={true}>
          <Grid container spacing={2} className="data-grid">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card ohm-chart-card">
                <TotalValueDepositedGraph />
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card ohm-chart-card">
                <MarketValueGraph />
              </Paper>
            </Grid>
          </Grid>
        </Zoom>
      </Container>
    </div>
  );
});

export default TreasuryDashboard;
