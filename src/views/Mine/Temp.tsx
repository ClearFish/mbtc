import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";
import MineBannerH5 from "../../assets/images/mine/mine-banner-h5.png";
import { memo, useEffect, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { InfoTooltip } from "@olympusdao/component-library";
import { t } from "@lingui/macro";
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
  Select,
  MenuItem,
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
import { formatMBTC, formatNumber } from "../../helpers";
import metaintelp4 from "../MyNft/assets/metaintelp4.png";

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
  consumption?: string;
  hashRate?: string;
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
  const [unStakedList, setUnStakedList] = useState<NftType[]>([]);
  const [stakedList, setStakedList] = useState<NftType[]>([]);
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [mbtcMined, setMbtcMined] = useState("0");
  const [mfuelCost, setMfuelCost] = useState("0");
  const [isHarvest, setIsHarvest] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [total, setTotal] = useState(0);
  const [order1, setOrder1] = useState("tokenId");
  const [order2, setOrder2] = useState("tokenId");
  const [order1List, setOrder1List] = useState([
    {
      value: "tokenId",
      text: "TokenId",
      asc: true,
    },
    {
      value: "earned",
      text: "MinedMBTC",
      asc: true,
    },
    {
      value: "cost",
      text: "MFuelCost",
      asc: true,
    },
  ]);
  const [order2List, setOrder2List] = useState([
    {
      value: "tokenId",
      text: "TokenId",
      asc: true,
    },
  ]);

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
      setMfuelCost(data);
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

  const handleClick = (event: MouseEvent<HTMLElement>, type?: string) => {
    if (value === "1") {
      setMinerItem(stakedList);
      if (type && type === "harvest") {
        setIsHarvest(true);
      } else {
        setIsHarvest(false);
      }
    } else {
      setMinerItem(unStakedList);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleSelectAll = () => {
    const hasChecked = minerItem ? minerItem.filter(item => item.checked).length : 0;
    if (hasChecked > 0) {
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
        if (isHarvest) {
          batchGetRewards(checkedList);
        } else {
          batchWithdrawMiners(checkedList);
        }
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

  const getRight = async (tokenId: string, owner: string) => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/info";
      return fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            tokenId: tokenId,
            owner: owner,
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          return res.data;
        });
    } catch (err) {
      console.log(err);
      dispatch(error(t`Fail to get info`));
      return {};
    }
  };

  /** 获取未质押nft **/
  const getUnStakedList = async (flag?: boolean) => {
    try {
      if (listLoading) {
        return;
      }
      setListLoading(true);
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/owner/detail";
      const {
        data: { list, total },
      } = await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            contract: NFTMiner_ADDRESS,
            address: address,
            pageNum: pageNum,
            pageSize: pageSize,
            orderByColumn: order2,
            isAsc: order2List.filter(item => item.value === order2)[0].asc ? "asc" : "desc",
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });

      const requestBox = [];
      for (let i = 0; i < list.length; i++) {
        requestBox.push(
          (async () => {
            const info = await getRight(list[i].tokenId, address);
            return {
              id: list[i].tokenId,
              consumption: info.attributes?.consumption,
              hashRate: info.attributes?.hashrate,
              url: metaintelp4,
              checked: false,
              disabled: false,
            };
          })(),
        );
      }
      Promise.all(requestBox).then(res => {
        if (pageNum === 1) {
          setUnStakedList(res);
        } else {
          setUnStakedList([...unStakedList, ...res]);
        }
        setTotal(total);
        setListLoading(false);
      });
    } catch (error) {
      console.log(error);
      setListLoading(false);
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
  const getStakedList = async (flag?: boolean) => {
    try {
      if (!flag) setListLoading(true);
      const stakedNum = await minerAmountOf(address);
      console.log({ stakedNum });
      const requestBox = [];
      for (let i = 0; i < stakedNum; i++) {
        requestBox.push(
          (async () => {
            const tokenId = await minerOfOwnerByIndex(address, `${i}`);
            const info = await stakingInformation(tokenId);
            return {
              id: tokenId,
              earned: formatNumber(Number(ethers.utils.formatEther(info.mBTCEarned)), 2),
              cost: formatNumber(Number(ethers.utils.formatEther(info.totalConsumption)), 2),
              consumption: info.consumption.toString(),
              hashRate: info.hashRate.toString(),
              url: metaintelp4,
              checked: false,
              disabled: false,
            };
          })(),
        );
      }
      Promise.all(requestBox).then(res => {
        // 因这里是从合约取的数据，前端排序
        res = res.sort((a: any, b: any) => b[order1] - a[order1]);
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
    try {
      await checkNftApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const stakeTx = await mbtcStakingContract.stakeMiner(minerId, poolId);
      await stakeTx.wait();
      await getUnStakedList();
      await getStakedList();
      dispatch(info(t`Success to stake`));
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to stake`));
    }
  };

  /** 批量质押NFT **/
  const batchStakeMiners = async (minerIds: string[], poolId: string) => {
    setLoading(true);
    try {
      await checkNftApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const tx = await mbtcStakingContract.batchStakeMiners(minerIds, poolId);
      await tx.wait();
      await getUnStakedList();
      setLoading(false);
      dispatch(info(t`Success to stake`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to stake`));
    }
  };

  /** 质押NFT提取 **/
  const withdrawMiner = async (minerId: string) => {
    setLoading(true);
    try {
      await checkMfuelApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const tx = await mbtcStakingContract.withdrawMiner(minerId);
      await tx.wait();
      await getStakedList();
      setLoading(false);
      dispatch(info(t`Success to unstake`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to unstake`));
    }
  };

  /** 批量质押NFT提取 **/
  const batchWithdrawMiners = async (minerIds: string[]) => {
    setLoading(true);
    try {
      await checkMfuelApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const tx = await mbtcStakingContract.batchWithdrawMiners(minerIds);
      await tx.wait();
      await getUnStakedList();
      setLoading(false);
      dispatch(info(t`Success to batch withdraw`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to batch withdraw`));
    }
  };

  /** 全部提取质押NFT **/
  const withdrawAllMiners = async () => {
    setLoading(true);
    try {
      await checkMfuelApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const res = await mbtcStakingContract.withdrawAllMiners();
      if (res && res.data) {
        await getUnStakedList();
        setLoading(false);
        dispatch(info(t`Success to withdraw all`));
      } else {
        setLoading(false);
        dispatch(error(t`Fail to withdraw all`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to withdraw all`));
    }
  };

  /** 提取单个NFT质押收益 **/
  const getReward = async (minerId: string) => {
    setLoading(true);
    try {
      await checkMfuelApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const rewardTx = await mbtcStakingContract.getReward(minerId);
      await rewardTx.wait();
      await getStakedList();
      setLoading(false);
      dispatch(info(t`Success to harvest`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to harvest`));
    }
  };

  // 批量提取NFT质押收益
  const batchGetRewards = async (minerIds: string[]) => {
    setLoading(true);
    try {
      await checkMfuelApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const tx = await mbtcStakingContract.batchGetRewards(minerIds);
      await tx.wait();
      await getStakedList();
      setLoading(false);
      dispatch(info(t`Success to harvest batch`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to harvest batch`));
    }
  };

  // 提取全部NFT质押收益
  const getAllRewards = async () => {
    setLoading(true);
    try {
      await checkMfuelApproved();
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const rewardsTx = await mbtcStakingContract.getAllRewards();
      await rewardsTx.wait();
      await getStakedList();
      setLoading(false);
      dispatch(info(t`Success to harvest all`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to harvest all`));
    }
  };

  // 获取指定NFT质押信息
  const stakingInformation = async (minerId: string) => {
    try {
      const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
      const res = await mbtcStakingContract.stakingInformation(minerId);
      return res;
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  // 合约授权
  const checkNftApproved = async () => {
    try {
      const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
      // 检查NFT（ERC 721）是否授权
      const isApprovedForAll = await nftMinerContract.isApprovedForAll(address, MBTCStaking_ADDRESS);
      if (!isApprovedForAll) {
        const approveTx = await nftMinerContract.setApprovalForAll(MBTCStaking_ADDRESS, true);
        await approveTx.wait();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkMfuelApproved = async () => {
    // 检查代币（ERC20）是否授权
    try {
      const mFuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);
      const allowance = await mFuelContract.allowance(address, MBTCStaking_ADDRESS);
      if (allowance.toString() === "0" || allowance.toString().length < 1) {
        const approveTx = await mFuelContract.approve(MBTCStaking_ADDRESS, ethers.constants.MaxUint256);
        await approveTx.wait();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeOrder = async (e: any) => {
    try {
      const setOrder = value === "1" ? setOrder1 : setOrder2;
      const setOrderList = value === "1" ? setOrder1List : setOrder2List;
      const order = value === "1" ? order1 : order2;
      const orderList = value === "1" ? order1List : order2List;
      if (e.target.value || (e.target.classList && e.target.classList.contains("order-list"))) {
        if (e.target.value) {
          setOrder(e.target.value);
        }
        if (e.target.classList && e.target.classList.contains("order-list")) {
          const newOrderList = orderList.map(item => {
            if (item.value === order) item.asc = !item.asc;
            return item;
          });
          setOrderList(newOrderList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scrollHandler = async () => {
    if (unStakedList.length >= total) {
      return;
    }
    if (listLoading) {
      return;
    }
    const targetNode = document.getElementById("mine-view");
    //窗口高度
    const windowHeight = targetNode?.clientHeight || 0;
    //滚动高度
    const scrollTop = targetNode?.scrollTop || 0;
    //页面高度
    const documentHeight = targetNode?.scrollHeight || 0;

    if (windowHeight + scrollTop >= documentHeight) {
      console.log("页面触底啦");
      await setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    try {
      if (provider && address && networkId === 56) {
        getStakedList();
        getMbtcMined();
        getMfuelCost();
        if (pageNum === 1) {
          getUnStakedList();
        } else {
          setPageNum(1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [networkId, connected, address]);

  useEffect(() => {
    if (pageNum === 1) {
      getUnStakedList();
    } else {
      setPageNum(1);
    }
  }, [order2, order2List]);

  useEffect(() => {
    getUnStakedList();
  }, [pageNum]);

  return (
    <div id="mine-view" onScroll={scrollHandler}>
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
                    message={`You need enough MFuel at your wallet in order to harvest. If you have more than 30 staked NFTs, consider using Harvest Batch`}
                  />
                </div>
                <div className={`card-box`}>
                  <div className="card-info">
                    <Typography className="card-info-title">{t`MBTC mined`} </Typography>
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
                onClick={() => {
                  getStakedList(true);
                }}
              />
              <Tab
                className={`${isSmallScreen || isVerySmallScreen ? "tab-mobile" : ""}`}
                label="Miners in wallet"
                value="2"
                onClick={() => {
                  getUnStakedList(true);
                }}
              />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              {stakedList && stakedList.length > 0 && (
                <Grid item xs={12}>
                  <Box className={`btc-item-title-container ${isSmallScreen ? "isMobile" : "pc"}`}>
                    <Box className={`btc-item-right-container ${isSmallScreen ? "isMobile" : "pc"}`}>
                      <Box
                        className={`btc-item-right-btn btc-item-right-btn-gold ${isSmallScreen && "isMobile"}`}
                        onClick={e => {
                          handleClick(e, "harvest");
                        }}
                      >
                        {t`Batch Harvest`}
                      </Box>
                      <Box
                        className={`btc-item-right-btn  ${isSmallScreen && "isMobile"}`}
                        onClick={e => {
                          handleClick(e, "unstake");
                        }}
                      >
                        {t`Unstake Miners`}
                      </Box>
                      <Box style={{ marginRight: "1rem", position: "relative" }}>
                        {/* <Select
                            labelId="order-select"
                            value={order1}
                            onClick={changeOrder}
                            disableUnderline
                            className={`order-select ${
                              order1List.filter(item => item.value === order1)[0].asc ? "asc" : ""
                            }`}
                            name="order"
                          >
                            {order1List.map(item => (
                              <MenuItem value={item.value} className={`order-list ${item.asc ? "asc" : ""}`}>
                                {item.text}
                              </MenuItem>
                            ))}
                          </Select> */}
                      </Box>
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
                  paddingTop: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.6rem",
                  paddingBottom: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.6rem",
                }}
                spacing={5}
              >
                {listLoading ? (
                  <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress />
                    <Typography variant="h5" style={{ marginLeft: "1rem", padding: "6.5rem 0" }}>
                      Communicating with blockchain nodes...
                    </Typography>
                  </Box>
                ) : stakedList && stakedList.length > 0 ? (
                  <Grid className="stake-container" container>
                    {stakedList.map(item => (
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
                            <div className="gantan">
                              <InfoTooltip message={`hashRate:${item.hashRate}\nconsumption:${item.consumption}`} />
                            </div>
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
                                  {t`Harvest`}
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
                                    {t`MFuel Cost`}
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
                                  {t`Unstake`}
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
                  <Box className={`btc-item-title-container ${isSmallScreen ? "isMobile" : "pc"}`}>
                    <Box className={`btc-item-right-container ${isSmallScreen ? "isMobile" : "pc"}`}>
                      <Box className={`btc-item-right-btn ${isSmallScreen && "isMobile"}`} onClick={handleClick}>
                        {t`Stake Miners`}
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
                      <Box style={{ marginRight: "1rem" }}>
                        <Select
                          labelId="order-select"
                          value={order2}
                          onClick={changeOrder}
                          disableUnderline
                          className={`order-select ${
                            order2List.filter(item => item.value === order2)[0].asc ? "asc" : ""
                          }`}
                          name="order"
                        >
                          {order2List.map(item => (
                            <MenuItem value={item.value} className={`order-list ${item.asc ? "asc" : ""}`}>
                              {item.text}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
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
                <Grid className="stake-container" container>
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
                                  {t`HashRate`}
                                </Box>
                                <Box
                                  className="text-more item-price"
                                  aria-owns={mouseHover ? "mouse-over-popover" : undefined}
                                  aria-haspopup="true"
                                  onMouseEnter={handlePopoverOpen}
                                  onMouseLeave={handlePopoverClose}
                                >
                                  {item.hashRate}
                                </Box>
                                <Box
                                  className="text-more item-title"
                                  aria-owns={mouseHover ? "mouse-over-popover" : undefined}
                                  aria-haspopup="true"
                                  onMouseEnter={handlePopoverOpen}
                                  onMouseLeave={handlePopoverClose}
                                >
                                  {t`Consumption`}
                                </Box>
                                <Box
                                  className="text-more item-price"
                                  aria-owns={mouseHover ? "mouse-over-popover" : undefined}
                                  aria-haspopup="true"
                                  onMouseEnter={handlePopoverOpen}
                                  onMouseLeave={handlePopoverClose}
                                >
                                  {item.consumption}
                                </Box>
                              </Box>
                              <div
                                className={`btn ${false ? "orange" : "blue"}`}
                                onClick={() => {
                                  stakeMiner(item.id, POOL_ID);
                                }}
                              >
                                {t`Stake`}
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
            <Box hidden={!listLoading}>
              <Typography style={{ padding: "2rem 0" }}>Loading More ...</Typography>
            </Box>
          </TabPanel>
        </TabContext>

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
                {t`Confirm`}
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
        <Typography variant="h5" style={{ marginLeft: "1rem" }}>
          {t`Communicating with blockchain nodes...`}
        </Typography>
      </Backdrop>
    </div>
  );
};

export default memo(Mine);
