import { t } from "@lingui/macro";
import { Metric } from "@olympusdao/component-library";
import { formatCurrency, formatNumber, formatMBTC } from "src/helpers";
import { useCurrentIndex } from "src/hooks/useCurrentIndex";
import {
  useMarketCap,
  useMBTCPrice,
  useMinedMBTC,
  useMyMiningHashRate,
  useMyNFTMiners,
  useMyNFTPools,
  useOhmCirculatingSupply,
  useTotalMiningHashRate,
  useTotalSupply,
  useTotalValueDeposited,
  useTreasuryTotalBacking,
  useVolume24,
} from "src/hooks/useProtocolMetrics";
import { useStakingRebaseRate } from "src/hooks/useStakingRebaseRate";

type MetricProps = PropsOf<typeof Metric>;
type AbstractedMetricProps = Omit<MetricProps, "metric" | "label" | "tooltip" | "isLoading">;

export const MarketCap: React.FC<AbstractedMetricProps> = props => {
  const { data: marketCap } = useMarketCap();

  const _props: MetricProps = {
    ...props,
    label: t`Total Market Cap`,
  };

  if (marketCap) _props.metric = formatCurrency(marketCap, 0);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const MBTCPrice: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMBTCPrice();

  const _props: MetricProps = {
    ...props,
    label: t`MBTC Price`,
  };

  if (data) _props.metric = data;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const CircSupply: React.FC<AbstractedMetricProps> = props => {
  const { data: totalSupply } = useTotalSupply();
  const { data: circSupply } = useOhmCirculatingSupply();

  const _props: MetricProps = {
    ...props,
    label: t`Circulating Market Cap`,
  };

  if (circSupply && totalSupply) _props.metric = `${formatNumber(circSupply)}`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const BackingPerOHM: React.FC<AbstractedMetricProps> = props => {
  const { data: circSupply } = useOhmCirculatingSupply();
  const { data: treasuryBacking } = useTreasuryTotalBacking();

  const _props: MetricProps = {
    ...props,
    label: t`Circulating Supply`,
  };

  if (circSupply && treasuryBacking) _props.metric = `${formatCurrency(treasuryBacking / circSupply, 2)}`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const CurrentIndex: React.FC<AbstractedMetricProps> = props => {
  const { data: currentIndex } = useCurrentIndex();

  const _props: MetricProps = {
    ...props,
    label: t`Next Havling Countdown`,
  };

  if (currentIndex) _props.metric = `${currentIndex.toFormattedString(2)} sOHM`;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const Volume24: React.FC<AbstractedMetricProps> = props => {
  const { data } = useVolume24();
  const _props: MetricProps = {
    ...props,
    label: t`Volume (24h)`,
  };

  if (data || data === 0) _props.metric = data;
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

  if (data || data === 0) _props.metric = formatMBTC(data, 2);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const MinedMBTCNetWorth: React.FC<AbstractedMetricProps> = props => {
  const { data: totalValueDeposited } = useTotalValueDeposited();

  const _props: MetricProps = {
    ...props,
    label: t`Mined MBTC Net Worth`,
  };

  if (totalValueDeposited) _props.metric = formatCurrency(totalValueDeposited, 0);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};
export const TotalMiningHashRate: React.FC<AbstractedMetricProps> = props => {
  const { data } = useTotalMiningHashRate();

  const _props: MetricProps = {
    ...props,
    label: t`Total Mining HashRate`,
  };

  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};
export const MyMiningHashRate: React.FC<AbstractedMetricProps> = props => {
  const { data } = useMyMiningHashRate();

  const _props: MetricProps = {
    ...props,
    label: t`My Mining HashRate`,
  };

  console.log({
    data,
  });

  if (data || data === 0) _props.metric = data;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};
export const MBTCReward: React.FC<AbstractedMetricProps> = props => {
  const { data: totalValueDeposited } = useTotalValueDeposited();

  const _props: MetricProps = {
    ...props,
    label: t`MBTC Reward`,
  };

  if (totalValueDeposited) _props.metric = formatCurrency(totalValueDeposited, 0);
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
