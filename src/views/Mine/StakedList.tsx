import "./Mine.scss";
import { memo, useEffect, useState, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { InfoTooltip } from "@olympusdao/component-library";
import { t } from "@lingui/macro";
// import { Paper } from "@olympusdao/component-library";
import { ReactComponent as empty } from "./assets/images/empty.svg";
import {
  useMediaQuery,
  Box,
  Grid,
  Button,
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
  mFuel_ADDRESS,
  MFuel_ABI,
} from "src/contract";
import { error, info } from "../../slices/MessagesSlice";
import { useWeb3Context } from "src/hooks/web3Context";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
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
  attributes?: [];
  id: string;
  checked: boolean;
  disabled: boolean;
  mfuelCost?: string;
  consumption?: string;
  hashRate?: string;
}

type ScrollProps = {
  parent: any;
};

const StakedList: React.FC<ScrollProps> = ({ parent }) => {
  const history = useHistory();
  // const { address, connect, provider, connected, networkId, providerInitialized } = useWeb3Context();
  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  usePathForNetwork({ pathName: "mine", networkID: networkId, history });

  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const [stakedList, setStakedList] = useState<NftType[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [isHarvest, setIsHarvest] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(60);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState("tokenId");
  const [orderList, setOrderList] = useState([
    {
      value: "tokenId",
      text: t`TokenId`,
      asc: true,
    },
    {
      value: "earned",
      text: t`Earned`,
      asc: true,
    },
    {
      value: "consumption",
      text: t`Cost`,
      asc: true,
    },
  ]);

  const classes = useStyles();

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
    setMinerItem(stakedList);
    if (type && type === "harvest") {
      setIsHarvest(true);
    } else {
      setIsHarvest(false);
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
      if (isHarvest) {
        batchGetRewards(checkedList);
      } else {
        batchWithdrawMiners(checkedList);
      }
    }
  };

  const open = Boolean(anchorEl);

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
      if (!address) {
        return;
      }
      if (pageNum === 1) {
        setFirstLoading(true);
      } else {
        setListLoading(true);
      }
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/staking";
      const {
        data: { nftlist, total },
      } = await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            token: MBTCStaking_ADDRESS,
            owner: address,
            pageNum: pageNum,
            pageSize: pageSize,
            orderByColumn: order,
            isAsc: orderList.filter(item => item.value === order)[0].asc ? "asc" : "desc",
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      const newStakedList = nftlist.map((item: any) => {
        return {
          id: item.tokenId,
          earned: item.earned,
          consumption: item.consumption,
          mfuelCost: item.mfuelCost,
          hashRate: item.hashRate,
          url: metaintelp4,
          checked: false,
          disabled: false,
        };
      });
      if (pageNum === 1) {
        setStakedList(newStakedList);
      } else {
        setStakedList([...stakedList, ...newStakedList]);
      }
      setTotal(total);
      setFirstLoading(false);
      setListLoading(false);
    } catch (error) {
      console.log(error);
      setListLoading(false);
      setFirstLoading(false);
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
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeOrder = async (e: any) => {
    try {
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

  const scrollHandler = useCallback(() => {
    if (stakedList.length >= total) {
      return;
    }
    if (listLoading) {
      return;
    }
    const targetNode = parent.current;
    //窗口高度
    const windowHeight = targetNode?.clientHeight || 0;
    //滚动高度
    const scrollTop = targetNode?.scrollTop || 0;
    //页面高度
    const documentHeight = targetNode?.scrollHeight || 0;

    if (Math.ceil(windowHeight + scrollTop) >= documentHeight) {
      console.log("页面触底啦1");
      setPageNum(pageNum + 1);
    }
  }, [total, listLoading, stakedList]);

  useEffect(() => {
    if (parent.current) {
      const mainNode = parent.current;
      mainNode.addEventListener("scroll", scrollHandler);
      return () => {
        if (mainNode) {
          mainNode.removeEventListener("scroll", scrollHandler);
        }
      };
    }
  }, [parent.current, stakedList, total, listLoading]);

  useEffect(() => {
    try {
      if (provider && address && networkId === 56) {
        getStakedList();
        if (pageNum === 1) {
          getStakedList();
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
      getStakedList();
    } else {
      setPageNum(1);
    }
  }, [order, orderList]);

  useEffect(() => {
    getStakedList();
  }, [pageNum]);

  return (
    <div id="staked-view" onScroll={scrollHandler}>
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
                <Box style={{ marginRight: "1rem" }}>
                  <Select
                    labelId="order-select"
                    value={order}
                    onClick={changeOrder}
                    disableUnderline
                    className={`order-select ${orderList.filter(item => item.value === order)[0].asc ? "asc" : ""}`}
                    name="order"
                  >
                    {orderList.map(item => (
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
            paddingTop: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.6rem",
            paddingBottom: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.6rem",
          }}
          spacing={5}
        >
          {firstLoading ? (
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress />
              <Typography variant="h5" style={{ marginLeft: "1rem", padding: "6.5rem 0" }}>
                {t`Communicating with blockchain nodes...`}
              </Typography>
            </Box>
          ) : stakedList && stakedList.length > 0 ? (
            <Grid className="stake-container" container>
              {stakedList.map(item => (
                <Grid item>
                  <Box className="btc-card-item">
                    <Box className="btc-card-item-img">
                      <img src={item.url} alt="" />
                      <div className="gantan">
                        <InfoTooltip
                          message={`${t`HashRate`}: ${item.hashRate}\n${t`Consumption`}: ${item.consumption}`}
                        />
                      </div>
                    </Box>
                    <Box className="btc-card-item-desc">
                      <Box className="btc-card-item-desc-title">
                        {t`Meta-Intel Pentium`} 4 #{item.id}
                      </Box>
                      <Box className="btc-card-item-desc-price-box">
                        <Box
                          className="btc-card-item-desc-price-item"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box display="flex" flexDirection="column">
                            <Box className="text-more item-title">{t`MBTC Mined`}</Box>
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
                              {item.mfuelCost}
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
      <Box hidden={!listLoading}>
        <Typography style={{ padding: "2rem 0" }}>{t`Loading More ...`}</Typography>
      </Box>

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

export default memo(StakedList);
