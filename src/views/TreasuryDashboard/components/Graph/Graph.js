import { t } from "@lingui/macro";
import { useTheme } from "@material-ui/core/styles";
import Chart from "src/components/Chart/Chart";
import { formatCurrency, trim } from "src/helpers";
import { useProtocolMetrics, useApyReport, useTotalMarketCapReport } from "src/hooks/useProtocolMetrics";
import { bulletpoints, itemType, tooltipInfoMessages, tooltipItems } from "../../treasuryData";

export const Graph = ({ children }) => <>{children}</>;

export const TotalValueDepositedGraph = () => {
  const theme = useTheme();
  const { data } = useTotalMarketCapReport();
  const itemName = t`TVL Total Value Locked`;
  return (
    <Chart
      type="area"
      data={data}
      itemType={itemType.dollar}
      itemNames={[itemName]}
      dataKey={["tvl"]}
      dataFormat="percentage"
      headerText={t`TVL Total Value Locked`}
      stopColor={[["#768299", "#98B3E9"]]}
      bulletpointColors={bulletpoints.tvl}
      infoTooltipMessage={tooltipInfoMessages().tvl}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${data && formatCurrency(data[0]?.tvl)}`}
    />
  );
};

export const MarketValueGraph = () => {
  const theme = useTheme();
  const { data } = useApyReport();
  const itemName = t`APY`;
  return (
    <Chart
      type="area"
      data={data}
      itemType={itemType.percentage}
      dataFormat="percent"
      itemNames={[itemName]}
      dataKey={["apy"]}
      headerText={t`APY`}
      stopColor={[["#768299", "#98B3E9"]]}
      bulletpointColors={bulletpoints.tvl}
      infoTooltipMessage={t`The annual percentage yield (APY)`}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${data && data[0].apy + "%"}`}
    />
  );
  // const theme = useTheme();
  // const { data } = useProtocolMetrics();

  // return (
  //   <Chart
  //     type="stack"
  //     data={data}
  //     dataKey={[
  //       "treasuryDaiMarketValue",
  //       "treasuryFraxMarketValue",
  //       "treasuryWETHMarketValue",
  //       "treasuryLusdMarketValue",
  //       "treasuryWBTCMarketValue",
  //       "treasuryUstMarketValue",
  //       "treasuryOtherMarketValue",
  //     ]}
  //     stopColor={[
  //       ["#F5AC37", "#F5AC37"],
  //       ["#768299", "#768299"],
  //       ["#DC30EB", "#DC30EB"],
  //       ["#8BFF4D", "#8BFF4D"],
  //       ["#ff758f", "#ff758f"],
  //       ["#4E1F71", "#4E1F71"],
  //       ["#8AECCD", "#8AECCD"],
  //     ]}
  //     headerText={t`Total Mining Hashrate`}
  //     headerSubText={`${data && formatCurrency(data[0].treasuryMarketValue)}`}
  //     bulletpointColors={bulletpoints.coin}
  //     itemNames={tooltipItems.coin}
  //     itemType={itemType.dollar}
  //     infoTooltipMessage={tooltipInfoMessages().mvt}
  //     expandedGraphStrokeColor={theme.palette.graphStrokeColor}
  //   />
  // );
};

export const RiskFreeValueGraph = () => {
  const theme = useTheme();
  const { data } = useProtocolMetrics();

  return (
    <Chart
      type="stack"
      data={data}
      format="currency"
      dataKey={[
        "treasuryDaiRiskFreeValue",
        "treasuryFraxRiskFreeValue",
        "treasuryLusdRiskFreeValue",
        "treasuryUstMarketValue",
      ]}
      stopColor={[
        ["#F5AC37", "#F5AC37"],
        ["#768299", "#768299"],
        ["#ff758f", "#ff758f"],
        ["#4E1F71", "#4E1F71"],
        ["#000", "#fff"],
        ["#000", "#fff"],
        ["#000", "#fff"],
      ]}
      headerText={t`Risk Free Value of Treasury Assets`}
      headerSubText={`${data && formatCurrency(data[0].treasuryRiskFreeValue)}`}
      bulletpointColors={bulletpoints.rfv}
      itemNames={tooltipItems.rfv}
      itemType={itemType.dollar}
      infoTooltipMessage={tooltipInfoMessages().rfv}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
    />
  );
};

export const ProtocolOwnedLiquidityGraph = () => {
  const theme = useTheme();
  const { data } = useProtocolMetrics();

  return (
    <Chart
      isPOL
      type="area"
      data={data}
      dataFormat="percent"
      itemNames={tooltipItems.pol}
      itemType={itemType.percentage}
      dataKey={["treasuryOhmDaiPOL"]}
      bulletpointColors={bulletpoints.pol}
      infoTooltipMessage={tooltipInfoMessages().pol}
      headerText={t`Protocol Owned Liquidity OHM-DAI`}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${data && trim(data[0].treasuryOhmDaiPOL, 2)}% `}
      stopColor={[["rgba(128, 204, 131, 1)", "rgba(128, 204, 131, 0)"]]}
    />
  );
};

export const OHMStakedGraph = () => {
  const theme = useTheme();
  const { data } = useProtocolMetrics();

  const staked =
    data &&
    data
      .map(metric => ({
        staked: (metric.sOhmCirculatingSupply / metric.ohmCirculatingSupply) * 100,
        timestamp: metric.timestamp,
      }))
      .filter(metric => metric.staked < 100);

  return (
    <Chart
      isStaked
      type="area"
      data={staked}
      dataKey={["staked"]}
      dataFormat="percent"
      headerText={t`OHM Staked`}
      stopColor={[["#55EBC7", "#47ACEB"]]}
      bulletpointColors={bulletpoints.staked}
      infoTooltipMessage={tooltipInfoMessages().staked}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
      headerSubText={`${staked && trim(staked[0].staked, 2)}% `}
    />
  );
};

export const RunwayAvailableGraph = () => {
  const theme = useTheme();
  const { data } = useProtocolMetrics();

  const runway = data && data.filter(metric => metric.runway10k > 5);

  const [current, ...others] = bulletpoints.runway;
  const runwayBulletpoints = [{ ...current, background: theme.palette.text.primary }, ...others];
  const colors = runwayBulletpoints.map(b => b.background);

  return (
    <Chart
      type="multi"
      data={runway}
      dataKey={["runwayCurrent", "runway7dot5k", "runway5k", "runway2dot5k"]}
      color={theme.palette.text.primary}
      stroke={colors}
      headerText={t`Runway Available`}
      headerSubText={`${data && trim(data[0].runwayCurrent, 1)} Days`}
      dataFormat="days"
      bulletpointColors={runwayBulletpoints}
      itemNames={tooltipItems.runway}
      itemType={""}
      infoTooltipMessage={tooltipInfoMessages().runway}
      expandedGraphStrokeColor={theme.palette.graphStrokeColor}
    />
  );
};
