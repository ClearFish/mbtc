import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";
import MineBannerH5 from "../../assets/images/mine/mine-banner-h5.png";
import { memo, useEffect, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Paper } from "@olympusdao/component-library";
import { ReactComponent as empty } from "./assets/images/empty.svg";
import {
  Container,
  useMediaQuery,
  Box,
  Grid,
  Button,
  Tabs,
  Tab,
  Popover,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  SvgIcon,
  Backdrop,
  CircularProgress,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ethers } from "ethers";
import {
  NFTMiner_ABI,
  NFTMiner_ADDRESS,
  MBTCStaking_ADDRESS,
  MBTCStaking_ABI,
  POOL_ID,
  mFuel_ADDRESS,
  MFuel_ABI,
} from "src/contract";
import { TabPanel, TabContext } from "@material-ui/lab";
import { error, info } from "../../slices/MessagesSlice";
import { useWeb3Context } from "src/hooks/web3Context";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
// import CryptoJS from "crypto-js";
import { formatNumber } from "../../helpers";
import metaintelp4 from "../MyNft/assets/metaintelp4.png";
import { formatMBTC } from "src/helpers";

export const NoStakedList = ({ message }: { message: string }) => (
  <Box className="NoStaked-box">
    <SvgIcon style={{ fontSize: 40 }} className="icon" component={empty} htmlColor="#868B93" />
    {message}
  </Box>
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      maxHeight: 400,
    },
    blackCardBtnOrange: {
      background: "#d6a241",
    },
    blackCardBtnBlue: {
      background: "#6a40bb",
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

interface NftType {
  name?: string;
  url: string;
  earned?: string;
  cost?: string;
  attributes?: [];
  id: string;
  checked: boolean;
  disabled: boolean;
}

const Mine: React.FC = () => {
  const history = useHistory();
  // const { address, connect, provider, connected, networkId, providerInitialized } = useWeb3Context();
  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  usePathForNetwork({ pathName: "mine", networkID: networkId, history });

  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const [unStakedList, setUnStakedList] = useState<NftType[]>();
  const [stakedList, setStakedList] = useState<NftType[]>();
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [mbtcMined, setMbtcMined] = useState("0");
  const [mfuelCost, setMfuelCost] = useState("0");
  const classes = useStyles();

  // 获取 MBTC mined
  const getMbtcMined = async () => {
    try {
      const { data } = await fetch(`https://admin.meta-backend.org/system/open/api/minedMBTC/${address}`, {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      setMbtcMined(formatMBTC(data, 2));
    } catch (err) {
      console.log(err);
    }
  };

  // 获取 MFuel cost
  const getMfuelCost = async () => {
    try {
      const { data } = await fetch(`https://admin.meta-backend.org/system/open/api/mFuel/cost/${address}`, {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      setMfuelCost(formatMBTC(data, 2));
    } catch (err) {
      console.log(err);
    }
  };

  // 获取合约签名

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  // 下拉弹框 start
  const [minerItem, setMinerItem] = useState<NftType[]>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const clearCheckList = () => {
    setMinerItem(
      minerItem
        ? minerItem.map(item => {
            return {
              ...item,
              checked: false,
              disabled: false,
            };
          })
        : [],
    );
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    clearCheckList();
    if (value === "1") {
      setMinerItem(stakedList);
    } else {
      setMinerItem(unStakedList);
    }
  };

  const handleSelectAll = () => {
    const hasChecked = minerItem ? minerItem.filter(item => item.checked).length : 0;
    console.log("hasChecked", hasChecked);

    if (hasChecked > 1) {
      clearCheckList();
      return;
    }
    const newStakedList = minerItem?.map((el, index) => {
      if (index < 20) {
        el.checked = true;
        el.disabled = false;
      } else {
        el.disabled = true;
        el.checked = false;
      }
      return el;
    });

    setMinerItem(newStakedList);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    setAnchorEl(null);
    // 选中的stakedID
    const checkedList = minerItem?.filter(item => item.checked).map(item => item.id);
    if (checkedList && checkedList.length > 0) {
      if (value === "1") {
        batchWithdrawMiners(checkedList);
      } else {
        batchStakeMiners(checkedList, POOL_ID);
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // 下拉弹框 end

  // over提示 start
  const [mouseHoverEl, setMouseHoverEl] = useState<HTMLElement | null>(null);
  const [mouseValue, setMouseValue] = useState<string>("");
  const mouseHover = Boolean(mouseHoverEl);
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    const el = event.target as HTMLElement;
    setMouseValue(el.innerText);
    setMouseHoverEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setMouseValue("");
    setMouseHoverEl(null);
  };
  // over提示 end

  // 多选 start
  const formatMinerItem = (newMinerItem: NftType[] | undefined) => {
    const hasChecked = newMinerItem ? newMinerItem.filter(item => item.checked).length : 0;
    if (hasChecked >= 20) {
      const checkItem = newMinerItem?.map(item => {
        if (!item.checked) {
          item.disabled = true;
        }
        return item;
      });
      return checkItem;
    }
    if (hasChecked < 20) {
      const checkItem = newMinerItem?.map(item => {
        item.disabled = false;
        return item;
      });
      return checkItem;
    }
  };
  const handleToggle = (value: string) => () => {
    const newMinerItem = minerItem?.map(item => {
      if (item.id === value) {
        item.checked = !item.checked;
      }
      return item;
    });
    const targetMinerItem = formatMinerItem(newMinerItem);
    setMinerItem(targetMinerItem);
  };
  // 多选 end

  /** 获取未质押nft **/
  const getUnStakedList = async () => {
    try {
      setListLoading(true);
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/owner/detail";
      const {
        data: { tokenIds },
      } = await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            contract: NFTMiner_ADDRESS,
            address: address,
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      setUnStakedList(
        tokenIds.map((item: any) => {
          return {
            id: item,
            url: metaintelp4,
            checked: false,
            disabled: false,
          };
        }),
      );
      setListLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /** nft展示前缀 **/
  const getTokenURI = async (tokenId: string) => {
    const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    const res = await nftMinerContract.tokenURI(tokenId);
    return res;
  };

  /** nft质押中的数量 **/
  const minerAmountOf = async (address: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.minerAmountOf(address);
    return res;
  };

  /** nft质押中的tokenId **/
  const minerOfOwnerByIndex = async (address: string, index: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.minerOfOwnerByIndex(address, index);
    return res.toString();
  };

  /** 获取已质押nft **/
  const getStakedList = async () => {
    try {
      setListLoading(true);
      const stakedNum = await minerAmountOf(address);
      console.log("stakedNum", stakedNum);

      const requestBox = [];
      for (let i = 0; i < stakedNum; i++) {
        requestBox.push(
          (async () => {
            const tokenId = await minerOfOwnerByIndex(address, `${i}`);
            const info = await stakingInformation(tokenId);
            // const tokenURI = await getTokenURI(tokenId);
            // const tokenURL = await window
            //   .fetch(tokenURI)
            //   .then(res => res.json())
            //   .then(json => json.image);
            return {
              id: tokenId,
              earned: formatNumber(Number(ethers.utils.formatEther(info.mBTCEarned)), 2),
              cost: info.consumption.toString(),
              url: metaintelp4,
              checked: false,
              disabled: false,
            };
          })(),
        );
      }
      Promise.all(requestBox).then(res => {
        setStakedList(res);
        setListLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  /** 质押单个NFT **/
  const stakeMiner = async (minerId: string, poolId: string) => {
    setLoading(true);
    await checkNftApproved();
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const stakeTx = await mbtcStakingContract.stakeMiner(minerId, poolId);
      await stakeTx.wait();
      await getUnStakedList();
      await getStakedList();
      dispatch(info(`Success to stake`));
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to stake`));
    }
  };

  /** 批量质押NFT **/
  const batchStakeMiners = async (minerIds: string[], poolId: string) => {
    setLoading(true);
    await checkNftApproved();
    const infoType = minerIds.length === stakedList?.length ? "stake all" : "batch stake";
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const tx = await mbtcStakingContract.batchStakeMiners(minerIds, poolId);
      await tx.wait();
      await getUnStakedList();
      setLoading(false);
      dispatch(info(`Success to ${infoType}`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to ${infoType}`));
    }
  };

  /** 质押NFT提取 **/
  const withdrawMiner = async (minerId: string) => {
    setLoading(true);
    await checkMfuelApproved();
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const tx = await mbtcStakingContract.withdrawMiner(minerId);
      await tx.wait();
      await getStakedList();
      setLoading(false);
      dispatch(info(`Success to unstake`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to unstake`));
    }
  };

  /** 批量质押NFT提取 **/
  const batchWithdrawMiners = async (minerIds: string[]) => {
    setLoading(true);
    await checkMfuelApproved();
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const tx = await mbtcStakingContract.batchWithdrawMiners(minerIds);
      await tx.wait();
      await getUnStakedList();
      setLoading(false);
      dispatch(info(`Success to batch withdraw`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to batch withdraw`));
    }
  };

  /** 全部提取质押NFT **/
  const withdrawAllMiners = async () => {
    setLoading(true);
    await checkMfuelApproved();
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.withdrawAllMiners();
      if (res && res.data) {
        await getUnStakedList();
        setLoading(false);
        dispatch(info(`Success to withdraw all`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to withdraw all`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to withdraw all`));
    }
  };

  /** 提取单个NFT质押收益 **/
  const getReward = async (minerId: string) => {
    setLoading(true);
    await checkMfuelApproved();
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const rewardTx = await mbtcStakingContract.getReward(minerId);
      await rewardTx.wait();
      await getStakedList();
      setLoading(false);
      dispatch(info(`Success to harvest`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to harvest`));
    }
  };

  // 批量提取NFT质押收益
  const batchGetRewards = async (minerIds: string[]) => {
    setLoading(true);
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.batchGetRewards(minerIds);
      if (res && res.data) {
        await getStakedList();
        setLoading(false);
        dispatch(info(`Success to harvest`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to harvest`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to harvest`));
    }
  };

  // 提取全部NFT质押收益
  const getAllRewards = async () => {
    setLoading(true);
    await checkMfuelApproved();
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const rewardsTx = await mbtcStakingContract.getAllRewards();
      await rewardsTx.wait();
      await getStakedList();
      setLoading(false);
      dispatch(info(`Success to harvest all`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to harvest all`));
    }
  };

  // 获取指定NFT质押信息
  const stakingInformation = async (minerId: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.stakingInformation(minerId);
    return res;
  };

  // 合约授权
  const checkNftApproved = async () => {
    const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    // 检查NFT（ERC 721）是否授权
    const isApprovedForAll = await nftMinerContract.isApprovedForAll(address, MBTCStaking_ADDRESS);
    if (!isApprovedForAll) {
      const approveTx = await nftMinerContract.setApprovalForAll(MBTCStaking_ADDRESS, true);
      await approveTx.wait();
    }
  };

  const checkMfuelApproved = async () => {
    // 检查代币（ERC20）是否授权
    const mFuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);
    const allowance = await mFuelContract.allowance(address, MBTCStaking_ADDRESS);
    if (allowance.toString() === "0" || allowance.toString().length < 1) {
      const approveTx = await mFuelContract.approve(MBTCStaking_ADDRESS, ethers.constants.MaxUint256);
      await approveTx.wait();
    }
  };

  useEffect(() => {
    try {
      if (provider && address && networkId === 97) {
        getUnStakedList();
        getStakedList();
        getMbtcMined();
        getMfuelCost();
      }
    } catch (err) {
      console.log(err);
    }
  }, [networkId, connected]);

  return (
    <div id="mine-view">
      <Container
        className="hero-banner-container"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
        }}
      >
        {isSmallScreen || isVerySmallScreen ? null : <div className="global-title">Mine</div>}
        <Box className="hero-metrics">
          <Grid xs={12} md={12}>
            <Box className="ohm-card-mine">
              <img className="card-banner pc" src={MineBanner} />
              <img className="card-banner h5" src={MineBannerH5} />
              <Button className={`batch-btn ${isSmallScreen && "isMobile"}`} onClick={getAllRewards}>
                Harvest MBTC
              </Button>
              <div className={`card-box ${isSmallScreen && "isMobile"}`}>
                <div className="card-info">
                  <Typography className="card-info-title">MBTC mined </Typography>
                  <Tooltip title={mbtcMined}>
                    <Typography className="card-info-content">{mbtcMined}</Typography>
                  </Tooltip>
                </div>
                <div className="card-info">
                  <Typography className="card-info-title">MFuel cost</Typography>
                  <Tooltip title={mfuelCost}>
                    <Typography className="card-info-content">{mfuelCost}</Typography>
                  </Tooltip>
                </div>
              </div>
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
        {listLoading ? (
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={(event, value) => {
                  handleChange(event, value);
                }}
                aria-label="basic tabs example"
              >
                <Tab
                  className={`${isSmallScreen || isVerySmallScreen ? "tab-mobile" : ""}`}
                  aria-describedby={id}
                  label="Staked Miners"
                  value="1"
                />
                <Tab
                  className={`${isSmallScreen || isVerySmallScreen ? "tab-mobile" : ""}`}
                  label="Miners in wallet"
                  value="2"
                />
              </Tabs>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={3}>
                {stakedList && stakedList.length > 0 && (
                  <Grid item xs={12}>
                    <Box className={`btc-item-title-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                      <Box className={`btc-item-right-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                        <Box className="btc-item-right-btn" onClick={handleClick}>
                          Unstake Miners
                        </Box>
                        {/* <Box className="btc-item-right-btn" onClick={withdrawAllMiners}>
                          Unstake All
                        </Box> */}
                      </Box>
                    </Box>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  style={{
                    paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
                    paddingRight: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
                    paddingTop: "1.6rem",
                    paddingBottom: "1.6rem",
                  }}
                  spacing={5}
                >
                  {stakedList && stakedList.length > 0 ? (
                    <Grid className="stake-container" container>
                      {stakedList.map(item => (
                        <Grid item>
                          <Box
                            className="btc-card-item"
                            style={{
                              // marginRight: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                              marginBottom: isSmallScreen || isVerySmallScreen ? "1rem" : "1.6rem",
                            }}
                          >
                            <Box className="btc-card-item-img">
                              <img src={item.url} alt="" />
                            </Box>
                            <Box className="btc-card-item-desc">
                              <Box className="btc-card-item-desc-title">Meta-Intel Pentium 4 #{item.id}</Box>
                              <Box className="btc-card-item-desc-price-box">
                                <Box
                                  className="btc-card-item-desc-price-item"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Box display="flex" flexDirection="column">
                                    <Box className="text-more item-title">MBTC Mined</Box>
                                    <Box className="text-more item-price">{item.earned}</Box>
                                  </Box>
                                  <div
                                    className={`btn ${true ? "orange" : "blue"}`}
                                    onClick={() => {
                                      getReward(item.id);
                                    }}
                                  >
                                    Harvest
                                  </div>
                                </Box>
                                <Box
                                  className="btc-card-item-desc-price-item"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Box display="flex" flexDirection="column">
                                    <Box
                                      className="item-title"
                                      aria-owns={mouseHover ? "mouse-over-popover" : undefined}
                                      aria-haspopup="true"
                                      onMouseEnter={handlePopoverOpen}
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      MFuel Cost
                                    </Box>
                                    <Box
                                      className="item-price"
                                      aria-owns={mouseHover ? "mouse-over-popover" : undefined}
                                      aria-haspopup="true"
                                      onMouseEnter={handlePopoverOpen}
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      {item.cost}
                                    </Box>
                                  </Box>
                                  <div
                                    className={`btn ${false ? "orange" : "blue"}`}
                                    onClick={() => {
                                      withdrawMiner(item.id);
                                    }}
                                  >
                                    Unstake
                                  </div>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <NoStakedList message="No staked miner, please Stake" />
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={3}>
                {unStakedList && unStakedList.length > 0 && (
                  <Grid item xs={12}>
                    <Box className={`btc-item-title-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                      <Box className={`btc-item-right-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                        <Box className="btc-item-right-btn" onClick={handleClick}>
                          Stake Miners
                        </Box>
                        {/* <Box
                          className="btc-item-right-btn"
                          onClick={() => {
                            unStakedList &&
                              batchStakeMiners(
                                unStakedList?.map(item => item.id),
                                POOL_ID,
                              );
                          }}
                        >
                          Stake All
                        </Box> */}
                      </Box>
                    </Box>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  style={{
                    paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
                    paddingRight: isSmallScreen || isVerySmallScreen ? ".3rem" : "1.4rem",
                    paddingTop: "1.6rem",
                    paddingBottom: "1.6rem",
                  }}
                  spacing={5}
                >
                  <Grid className="stake-container" container spacing={1} justifyContent="space-between">
                    {unStakedList?.map(item => (
                      <Grid item>
                        <Box
                          className="btc-card-item"
                          style={{
                            // marginRight: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                            marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                          }}
                        >
                          <Box className="btc-card-item-img">
                            <img src={item.url} alt="" />
                          </Box>
                          <Box className="btc-card-item-desc">
                            <Box className="btc-card-item-desc-title">Meta-Intel Pentium 4 #{item.id}</Box>
                            <Box className="btc-card-item-desc-price-box">
                              <Box
                                className="btc-card-item-desc-price-item"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Box display="flex" flexDirection="column">
                                  <Box
                                    className="text-more item-title"
                                    aria-owns={mouseHover ? "mouse-over-popover" : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    MBTC Cost
                                  </Box>
                                  <Box
                                    className="text-more item-price"
                                    aria-owns={mouseHover ? "mouse-over-popover" : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    {item.earned}
                                  </Box>
                                </Box>
                                <div
                                  className={`btn ${false ? "orange" : "blue"}`}
                                  onClick={() => {
                                    stakeMiner(item.id, POOL_ID);
                                  }}
                                >
                                  Stake
                                </div>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  {!unStakedList || unStakedList.length == 0 ? (
                    <NoStakedList message="No Miners in the Wallet" />
                  ) : undefined}
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        )}
        {/* 列表菜单 */}
        <Popover
          id="simple-popover"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box className="mine-checklist">
            <List dense className={classes.root}>
              {minerItem?.map(item => {
                const labelId = `checkbox-list-secondary-label-${item.id}`;
                return (
                  <ListItem key={item.id} button>
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={item.url} />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={`Meta-Intel Pentium 4 #${item.id}`} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        checked={item.checked}
                        edge="end"
                        onChange={handleToggle(item.id)}
                        disabled={item.disabled}
                        // checked={checked.indexOf(item.id) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            <Box className="mine-checklist-btn-box">
              <Button color="secondary" onClick={handleSelectAll} className="mine-checklist-btn">
                {minerItem?.every(item => item.checked) || (minerItem || []).filter(item => item.checked).length > 19
                  ? "Unselect All"
                  : "Select All"}
              </Button>
              <Button color="secondary" onClick={handleConfirm} className="mine-checklist-btn">
                Confirm
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>
      {/* tip提示 */}
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={mouseHover}
        anchorEl={mouseHoverEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box>{mouseValue}</Box>
      </Popover>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default memo(Mine);
