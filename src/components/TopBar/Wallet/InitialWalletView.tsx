import { Trans } from "@lingui/macro";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Icon } from "@olympusdao/component-library";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { t } from "@lingui/macro";
import {
  MBTCStaking_ABI,
  MBTCStaking_ADDRESS,
  mBTC_ADDRESS,
  MFuel_ABI,
  mFuel_ADDRESS,
  NFTMiner_ADDRESS,
} from "src/contract";
import { useAppSelector, useWeb3Context } from "src/hooks";
import useCurrentTheme from "src/hooks/useTheme";
import MbtcIcon from "../../../assets/icons/mbtc.png";
import NtfIcon from "../../../assets/icons/bnft.svg";
import MFuelIcon from "../../../views/TreasuryDashboard/assets/mfuel-logo2.png";
import WalletAddressEns from "./WalletAddressEns";
import { useMBTCPrice } from "src/hooks/useProtocolMetrics";
import { formatNumber } from "../../../helpers";
import { useDispatch } from "react-redux";

const DisconnectButton = () => {
  const { disconnect } = useWeb3Context();
  return (
    <Button onClick={disconnect} variant="contained" size="large" color="secondary">
      <Trans>Disconnect</Trans>
    </Button>
  );
};

const CloseButton = withStyles(theme => ({
  root: {
    ...theme.overrides?.MuiButton?.containedSecondary,
    width: "30px",
    height: "30px",
  },
}))(IconButton);

const WalletTotalValue = () => {
  const { address: userAddress, provider, networkId, providerInitialized, connected } = useWeb3Context();
  const signer = provider.getSigner();
  const isLoading = useAppSelector(s => s.app.loading);
  const marketPrice = useAppSelector(s => s.app.marketPrice || 0);
  const [currency, setCurrency] = useState<"USD" | "OHM">("USD");
  const [mbtcBalance, setMbtcBalance] = useState<string>("0");
  const [mfuelBalance, setMfuelBalance] = useState<string>("0");
  const [num, setNum] = useState<number>(0);
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const getMBTCToken = async () => {
    try {
      const mbtcContract = new ethers.Contract(mBTC_ADDRESS, MFuel_ABI, signer);
      const tx = await mbtcContract.balanceOf(userAddress);
      const mbtcBalance = (tx / Math.pow(10, 18)).toFixed(2);
      setMbtcBalance(mbtcBalance || "0");
    } catch (err) {
      console.log(err);
    }
  };

  const getMfuel = async () => {
    try {
      const mfuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);
      const tx = await mfuelContract.balanceOf(userAddress);
      const mfuelBalance = (tx / Math.pow(10, 18)).toFixed(2);
      setMfuelBalance(mfuelBalance || "0");
    } catch (err) {
      console.log(err);
    }
  };

  /** nft质押中的数量 **/
  const minerAmountOf = async (address: string) => {
    try {
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const res = await mbtcStakingContract.minerAmountOf(address);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const getNftNum = async () => {
    try {
      if (!userAddress) {
        return;
      }
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/owner/detail";
      const {
        data: { total },
      } = await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            contract: NFTMiner_ADDRESS,
            address: userAddress,
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      const stakedNum = await minerAmountOf(userAddress);
      setNum(total + Number(stakedNum));
    } catch (err) {
      console.log({ err });
    }
  };

  const mbtcPrice = useMBTCPrice().data || 0;

  useEffect(() => {
    try {
      if (provider && userAddress && networkId === 56) {
        getMBTCToken();
        getMfuel();
        getNftNum();
      }
    } catch (err) {
      console.log(err);
    }
  }, [networkId, connected]);

  return (
    <Box className="tooBar-container" onClick={() => setCurrency(currency === "USD" ? "OHM" : "USD")}>
      <WalletAddressEns />
      <Typography variant="h3" style={{ fontWeight: 700, cursor: "pointer" }} className="tooBar-price">
        {!isLoading ? (
          `$ ${formatNumber(mbtcPrice * Number(mbtcBalance), 2)}`
        ) : (
          <Skeleton variant="text" width={"100%"} />
        )}
      </Typography>
      <div className="address-list">
        <div className="address-list-item">
          <img src={MbtcIcon} className="icon" />
          <div className="name">{t`MBTC`}</div>
          <div className="count-only">{mbtcBalance}</div>
          {/* <div className="value">≈$10000</div> */}
        </div>
        <div className="address-list-item">
          <img src={MFuelIcon} className="icon" />
          <div className="name">{t`MFuel`}</div>
          <div className="count-only">{mfuelBalance}</div>
          {/* <div className="value">≈$10000</div> */}
        </div>
        <div className="address-list-item">
          <img src={NtfIcon} className="icon" />
          <div className="name">{t`NFT Miner`}</div>
          <div className="count-only">{num}</div>
        </div>
      </div>
    </Box>
  );
};

function InitialWalletView({ onClose }: { onClose: () => void }) {
  const theme = useTheme();
  const [currentTheme] = useCurrentTheme();
  const { networkId } = useWeb3Context();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Paper>
      <Box sx={{ padding: theme.spacing(0, 3), display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box
          className="toolBar-title"
          sx={{ display: "flex", justifyContent: "space-between", padding: theme.spacing(3, 0) }}
        >
          <Typography variant="h1" component="div" style={{ color: "#FFF", fontWeight: "400" }}>
            {t`My Wallet`}
          </Typography>
          <CloseButton className="toolBar-close" size="small" onClick={onClose} aria-label="close wallet">
            <Icon name="x" />
          </CloseButton>
        </Box>
        <WalletTotalValue />
        <Box sx={{ margin: theme.spacing(2, -3) }}>
          <Divider color="secondary" />
        </Box>
        <Box sx={{ marginX: "auto" }}>
          <DisconnectButton />
        </Box>
      </Box>
    </Paper>
  );
}

export default InitialWalletView;
