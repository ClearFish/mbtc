import { t } from "@lingui/macro";
import { Metric } from "@olympusdao/component-library";
import { formatCurrency, formatNumber } from "src/helpers";
import {
  useMBTCPrice,
  useMinedMBTC,
  useMyMiningHashRate,
  useMyNFTMiners,
  useMyNFTPools,
  useTotalMiningHashRate,
  useTotalValueDeposited,
  useVolume24,
  useTotalValueLocked,
  useMBTCConstant,
} from "src/hooks/useProtocolMetrics";
import { useStakingRebaseRate } from "src/hooks/useStakingRebaseRate";

type MetricProps = PropsOf<typeof Metric>;
type AbstractedMetricProps = Omit<MetricProps, "metric" | "label" | "tooltip" | "isLoading">;

export const MarketCap: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCConstant();

  const _props: MetricProps = {
    ...props,
    label: t`Total Market Cap`,
  };

  if (data) _props.metric = `$` + String(data.totalMarketCap);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const MBTCPrice: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCPrice();

  const _props: MetricProps = {
    ...props,
    label: t`MBTC Price`,
  };

  if (data || data === 0) _props.metric = `$${data}`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const TotalValueLocked: React.FC<AbstractedMetricProps> = props => {
  const { data } = useTotalValueLocked();

  const _props: MetricProps = {
    ...props,
    label: t`TVL Total Value Locked`,
  };

  if (data || data === 0) _props.metric = `$${formatNumber(data, 2)}`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const CirculatingMarketCap: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCConstant();

  const _props: MetricProps = {
    ...props,
    label: t`Circulating Market Cap`,
  };

  if (data) _props.metric = `$${data.cicrulatingMarketCap || 0}`;
  else _props.isLoading = true;
  console.log(_props);
  return <Metric {..._props} />;
};

export const CirculatingSupply: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCConstant();

  const _props: MetricProps = {
    ...props,
    label: t`Circulating Supply`,
  };

  if (data) _props.metric = data.cicrulatingSupply;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const NextHalvingCountdown: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCConstant();

  const _props: MetricProps = {
    ...props,
    label: t`Next Halving Countdown`,
  };

  if (data) _props.metric = data.nextHavlingCountdown;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const Volume24: React.FC<AbstractedMetricProps> = props => {
  const { data } = useVolume24();
  const _props: MetricProps = {
    ...props,
    label: t`Volume (24h)`,
  };

  if (data || data === 0) _props.metric = `$${data}`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const TotalValueDeposited: React.FC<AbstractedMetricProps> = props => {
  const { data: totalValueDeposited } = useTotalValueDeposited();

  const _props: MetricProps = {
    ...props,
    label: t`Total Value Deposited`,
  };

  if (totalValueDeposited) _props.metric = formatCurrency(totalValueDeposited, 0);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const StakingAPY: React.FC<AbstractedMetricProps> = props => {
  const { data: rebaseRate } = useStakingRebaseRate();

  const _props: MetricProps = {
    ...props,
    label: t`APY`,
  };

  if (rebaseRate) {
    const apy = (Math.pow(1 + rebaseRate, 365 * 3) - 1) * 100;
    const formatted = formatNumber(apy, 1);

    _props.metric = `${formatted}%`;
  } else _props.isLoading = true;
  return <Metric {..._props} />;
};

export const MinedMBTC: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMinedMBTC();

  const _props: MetricProps = {
    ...props,
    label: t`Mined MBTC`,
  };

  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const MinedMBTCNetWorth: React.FC<AbstractedMetricProps> = props => {
  const minedMbtcRes = useMinedMBTC();
  const mbtcPriceRes = useMBTCPrice();

  const _props: MetricProps = {
    ...props,
    label: t`Mined MBTC Net Worth`,
  };

  if (typeof minedMbtcRes.data !== "undefined" && typeof mbtcPriceRes.data !== "undefined")
    _props.metric = `$${(minedMbtcRes.data * mbtcPriceRes.data).toFixed(2)}`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};
export const TotalMiningHashRate: React.FC<AbstractedMetricProps> = props => {
  const { data } = useTotalMiningHashRate();
  const _props: MetricProps = {
    ...props,
    label: t`APY`,
  };
  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;
  _props.tooltip = t`The annual percentage yield (APY)`;
  return <Metric {..._props} />;
};
export const MyMiningHashRate: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMyMiningHashRate();

  const _props: MetricProps = {
    ...props,
    label: t`My Mining HashRate`,
  };

  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;
  return <Metric {..._props} />;
};
export const MBTCReward: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCConstant();

  const _props: MetricProps = {
    ...props,
    label: t`MBTC Reward`,
  };

  if (data || data === 0) _props.metric = data.mbtcReward;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};
export const EarnedMFuel: React.FC<AbstractedMetricProps> = props => {
  const { data: totalValueDeposited } = useTotalValueDeposited();

  const _props: MetricProps = {
    ...props,
    label: t`Earned MFuel`,
  };

  if (totalValueDeposited) _props.metric = formatCurrency(totalValueDeposited, 0);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};
export const EarnedMFuelNetWorth: React.FC<AbstractedMetricProps> = props => {
  const { data: totalValueDeposited } = useTotalValueDeposited();

  const _props: MetricProps = {
    ...props,
    label: t`Earned MFuel Net Worth`,
  };

  if (totalValueDeposited) _props.metric = formatCurrency(totalValueDeposited, 0);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const MyNFTMiners: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMyNFTMiners();

  const _props: MetricProps = {
    ...props,
    label: t`My NFT Miners`,
  };

  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const MyNFTPools: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMyNFTPools();

  const _props: MetricProps = {
    ...props,
    label: t`My NFT Pools`,
  };

  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const MBTCConstant: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCConstant();

  const _props: MetricProps = {
    ...props,
    label: t`My NFT Pools`,
  };

  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};
