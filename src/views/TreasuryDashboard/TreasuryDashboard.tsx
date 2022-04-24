import "./TreasuryDashboard.scss";

import { Box, Container, Grid, useMediaQuery, Zoom, Button, Typography } from "@material-ui/core";
import { Metric, MetricCollection, Paper } from "@olympusdao/component-library";
import { memo } from "react";

import { MarketValueGraph, TotalValueDepositedGraph } from "./components/Graph/Graph";
import {
  CirculatingSupply,
  CircSupply,
  NextHavlingCountdown,
  Volume24,
  MarketCap,
  MBTCReward,
  MinedMBTC,
  MinedMBTCNetWorth,
  MyMiningHashRate,
  MyNFTMiners,
  MBTCPrice,
  TotalMiningHashRate,
} from "./components/Metric/Metric";

import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useMBTCPrice, useMFuelprice } from "src/hooks/useProtocolMetrics";

import MBTC_LOGO from "./assets/mbtc-logo.png";
import MFUEL_LOGO from "./assets/mfuel-logo.png";
import TRANSFER from "./assets/transfer.png";

const sharedMetricProps: PropsOf<typeof Metric> = { labelVariant: "h6", metricVariant: "h5" };

const TreasuryDashboard = memo(() => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const history = useHistory();
  const { networkId, address, connected, provider } = useWeb3Context();
  usePathForNetwork({ pathName: "dashboard", networkID: networkId, history });
  const MBTCPriceData = useMBTCPrice().data || 0;
  const MFuelpriceData = useMFuelprice().data || 0;

  return (
    <div id="treasury-dashboard-view" className={`${isSmallScreen && "smaller"} ${isVerySmallScreen && "very-small"}`}>
      <div className="dashboard-title">Dashboard</div>
      <Container>
        <Grid container spacing={2} className="data-grid">
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box className="hero-metrics">
              <Paper className="ohm-card">
                <MetricCollection>
                  <MarketCap {...sharedMetricProps} />
                  <MBTCPrice {...sharedMetricProps} />
                  <CircSupply {...sharedMetricProps} />
                  <CirculatingSupply {...sharedMetricProps} />
                  <NextHavlingCountdown {...sharedMetricProps} />
                  <Volume24 {...sharedMetricProps} className="wsoprice" />
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
                        {MBTCPriceData}
                      </Typography>
                    </div>
                    <Button
                      className="card-pannel-btn"
                      variant="contained"
                      href="https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0xD98a7396eC1E53039ED4293559320CE16D792c3d"
                      target="_blank"
                    >
                      Buy
                    </Button>
                  </Grid>
                  <Grid item className="card-pannel">
                    <img className="card-pannel-logo" src={MFUEL_LOGO} alt="" />
                    <div className="transfer-pannel">
                      <div className="transfer-title">
                        <Typography variant="h6"> MFUEL</Typography>
                        <img className="transfer-logo" src={TRANSFER}></img>
                        <Typography variant="h6"> USD</Typography>
                      </div>
                      <Typography variant="h5" className="transfer-content">
                        {MFuelpriceData}
                      </Typography>
                    </div>
                    <Button
                      className="card-pannel-btn"
                      variant="contained"
                      href="https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0x0b523c1F1118d3082d6A22BC6FB26AA59a4D60fC"
                      target="_blank"
                    >
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
                  <MyNFTMiners {...sharedMetricProps} />
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
