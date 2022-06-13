import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";
import MineBannerH5 from "../../assets/images/mine/mine-banner-h5.png";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { InfoTooltip } from "@olympusdao/component-library";
import { t } from "@lingui/macro";
import {
  Container,
  useMediaQuery,
  Box,
  Grid,
  Button,
  Tabs,
  Tab,
  Backdrop,
  CircularProgress,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { ethers } from "ethers";
import { MBTCStaking_ADDRESS, MBTCStaking_ABI, mFuel_ADDRESS, MFuel_ABI } from "src/contract";
import { TabPanel, TabContext } from "@material-ui/lab";
import { error, info } from "../../slices/MessagesSlice";
import { useWeb3Context } from "src/hooks/web3Context";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import StakedList from "./StakedList";
import UnStakedList from "./UnStakedList";
import React from "react";

const Mine: React.FC = () => {
  const history = useHistory();
  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  usePathForNetwork({ pathName: "mine", networkID: networkId, history });
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [mbtcMined, setMbtcMined] = useState("0");
  const [mfuelCost, setMfuelCost] = useState("0");
  const mineRef = React.createRef<HTMLInputElement>();

  // 获取 MBTC mined
  const getMbtcTotal = async () => {
    try {
      const { data } = await fetch(`https://admin.meta-backend.org/system/open/api/nft/staking/attribute/total`, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            token: MBTCStaking_ADDRESS,
            owner: address,
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      const { totalEarned, totalConsumption } = data;
      setMbtcMined(totalEarned);
      setMfuelCost(totalConsumption);
    } catch (err) {
      console.log(err);
    }
  };

  // 获取合约签名
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  // 下拉弹框 start
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const checkMfuelApproved = async () => {
    // 检查代币（ERC20）是否授权
    try {
      const mFuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);
      const allowance = await mFuelContract.allowance(address, MBTCStaking_ADDRESS);
      if (allowance.toString() === "0" || allowance.toString().length < 1) {
        const approveTx = await mFuelContract.approve(MBTCStaking_ADDRESS, ethers.constants.MaxUint256);
        return await approveTx.wait();
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 提取全部NFT质押收益
  const getAllRewards = async () => {
    setLoading(true);
    try {
      const res = await checkMfuelApproved();
      if (!res) {
        setLoading(false);
        dispatch(error(t`Fail to be approved`));
        return;
      }
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const rewardsTx = await mbtcStakingContract.getAllRewards();
      await rewardsTx.wait();
      setLoading(false);
      dispatch(info(t`Success to harvest all`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to harvest all`));
    }
  };

  useEffect(() => {
    try {
      if (provider && address && networkId === 56) {
        getMbtcTotal();
      }
    } catch (err) {
      console.log(err);
    }
  }, [networkId, connected, address]);

  return (
    <div id="mine-view" ref={mineRef}>
      <Container
        className="hero-banner-container"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
        }}
      >
        {isSmallScreen || isVerySmallScreen ? null : <div className="global-title">{t`Mine`}</div>}
        <Box className="hero-metrics">
          <Grid xs={12} md={12}>
            <Box className="ohm-card-mine">
              <img className="card-banner pc" src={MineBanner} />
              <img className="card-banner h5" src={MineBannerH5} />
              <Box className={`batch-btn-container ${isSmallScreen && "isMobile"}`}>
                <Button className={`batch-btn ${isSmallScreen && "isMobile"}`} onClick={getAllRewards}>
                  {t`Harvest MBTC`}
                </Button>
                <div className="harvest-tip">
                  <InfoTooltip
                    message={t`You need enough MFuel at your wallet in order to harvest. If you have more than 30 staked NFTs, consider using Harvest Batch`}
                  />
                </div>
                <div className={`card-box`}>
                  <div className="card-info">
                    <Typography className="card-info-title">{t`MBTC mined`}</Typography>
                    <Tooltip title={mbtcMined}>
                      <Typography className="card-info-content">{mbtcMined || 0}</Typography>
                    </Tooltip>
                  </div>
                  <div className="card-info">
                    <Typography className="card-info-title">{t`MFuel cost`}</Typography>
                    <Tooltip title={mfuelCost}>
                      <Typography className="card-info-content">{mfuelCost || 0}</Typography>
                    </Tooltip>
                  </div>
                </div>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Container>
      <Box
        className="btc-item-container"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
        }}
      >
        <TabContext value={value}>
          <Box className="btc-box" sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={(event, value) => {
                handleChange(event, value);
              }}
              aria-label="basic tabs example"
            >
              <Tab
                className={`${isSmallScreen || isVerySmallScreen ? "tab-mobile" : ""}`}
                label={t`Staked Miners`}
                value="1"
              />
              <Tab
                className={`${isSmallScreen || isVerySmallScreen ? "tab-mobile" : ""}`}
                label={t`Miners in wallet`}
                value="2"
              />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <StakedList parent={mineRef} />
          </TabPanel>
          <TabPanel value="2">
            <UnStakedList parent={mineRef} />
          </TabPanel>
        </TabContext>
      </Box>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
        <Typography variant="h5" style={{ marginLeft: "1rem" }}>
          {t`Communicating with blockchain nodes...`}
        </Typography>
      </Backdrop>
    </div>
  );
};

export default memo(Mine);
