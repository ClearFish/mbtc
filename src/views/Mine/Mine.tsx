import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";
import { memo, SetStateAction, useEffect, useState, MouseEvent } from "react";
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
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ethers } from "ethers";
import { NFTMiner_ABI, NFTMiner_ADDRESS, MBTCStaking_ADDRESS, MBTCStaking_ABI, POOL_ID } from "src/contract";
import { TabPanel, TabContext } from "@material-ui/lab";
import { error, info } from "../../slices/MessagesSlice";
import { useWeb3Context } from "src/hooks/web3Context";

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
    },
    blackCardBtnOrange: {
      background: "#d6a241",
    },
    blackCardBtnBlue: {
      background: "#6a40bb",
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
}

const Mine: React.FC = () => {
  const history = useHistory();
  // const { address, connect, provider, connected, networkId, providerInitialized } = useWeb3Context();
  // usePathForNetwork({ pathName: "mine", networkID: networkId, history });
  const classes = useStyles();
  const { networkId } = useWeb3Context();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const [unStakedList, setUnStakedList] = useState<NftType[]>();
  const [stakedList, setStakedList] = useState<NftType[]>();
  const [checkList, setCheckList] = useState<string[]>([]); //选项checklist
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  // 下拉弹框 start
  const [minerItem, setMinerItem] = useState<NftType[]>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const clearCheckList = () => {
    setCheckList([]);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    clearCheckList();
    if (value === "1") {
      // console.log("stakedList", stakedList);
      setMinerItem(stakedList);
    } else {
      setMinerItem(unStakedList);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    // 选中的stakedID
    if (checkList && checkList.length > 0) {
      if (value === "1") {
        batchWithdrawMiners(checkList);
      } else {
        batchStakeMiners(checkList, POOL_ID);
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // 下拉弹框 end

  // 多选 start

  const handleToggle = (value: string) => () => {
    const currentIndex = checkList.indexOf(value);
    const newChecked = [...checkList];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckList(newChecked);
  };
  // 多选 end

  // 获取合约签名
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  /** 获取未质押nft **/
  const getUnStakedList = async () => {
    setListLoading(true);
    const address = await signer.getAddress();
    const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    const balance = await nftMinerContract.balanceOf(address);
    const tokenURI = await nftMinerContract.tokenURI(1);
    console.log({ balance });
    // const newNftList:
    //   | SetStateAction<NftType[] | undefined>
    //   | { name: string; image: string; attributes: []; mined: string; cost: string; id: string }[] = [];
    // for (let i = 0; i < balance; i++) {
    //   await window
    //     .fetch(tokenURI)
    //     .then(res => res.json())
    //     .then(json => {
    //       newNftList.push({
    //         name: json.name,
    //         image: json.image,
    //         attributes: json.attributes,
    //         mined: "12",
    //         cost: "13",
    //         id: "1",
    //       });
    //     });
    // }
    // setUnStakedList(newNftList);
    const newNftList:
      | SetStateAction<NftType[] | undefined>
      | { name: string; url: string; attributes: []; mined: string; cost: string; id: string }[] = [];
    for (let i = 1; i < 11; i++) {
      if ([12].indexOf(i) > -1) {
        newNftList.push({
          name: `test${i}`,
          url: `https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${i}.png`,
          attributes: [],
          mined: "262889.78",
          cost: "1212.12",
          id: `${i}`,
        });
      }
    }
    setUnStakedList(newNftList);
    setListLoading(false);
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
    setListLoading(true);
    const address = await signer.getAddress();
    const stakedNum = await minerAmountOf(address);
    console.log({ stakedNum });
    const requestBox = [];
    for (let i = 0; i < stakedNum; i++) {
      requestBox.push(
        (async () => {
          const tokenId = await minerOfOwnerByIndex(address, `${i}`);
          const info = await stakingInformation(tokenId);
          const tokenURI = await getTokenURI(tokenId);
          const tokenURL = await window
            .fetch(tokenURI)
            .then(res => res.json())
            .then(json => json.image);
          return {
            id: tokenId,
            earned: info.mBTCEarned.toString(),
            url: tokenURL,
          };
        })(),
      );
    }
    Promise.all(requestBox).then(res => {
      setStakedList(res);
      setListLoading(false);
    });
  };

  /** 质押单个NFT **/
  const stakeMiner = async (minerId: string, poolId: string) => {
    setLoading(true);
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.stakeMiner(minerId, poolId);
      if (res && res.data) {
        await getUnStakedList();
        await getStakedList();
        setLoading(false);
        dispatch(info(`Success to stake`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to stake`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to stake`));
    }
  };

  /** 批量质押NFT **/
  const batchStakeMiners = async (minerIds: string[], poolId: string) => {
    setLoading(true);
    const infoType = minerIds.length === stakedList?.length ? "stake all" : "batch stake";
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.batchStakeMiners(minerIds, poolId);
      if (res && res.data) {
        await getUnStakedList();
        setLoading(false);
        dispatch(info(`Success to ${infoType}`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to ${infoType}`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to ${infoType}`));
    }
  };

  /** 质押NFT提取 **/
  const withdrawMiner = async (minerId: string) => {
    setLoading(true);
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.withdrawMiner(minerId);
      if (res && res.data) {
        await getStakedList();
        await getUnStakedList();
        setLoading(false);
        dispatch(info(`Success to unstake`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to unstake`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to unstake`));
    }
  };

  /** 批量质押NFT提取 **/
  const batchWithdrawMiners = async (minerIds: string[]) => {
    setLoading(true);
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.batchWithdrawMiners(minerIds);
      if (res && res.data) {
        await getUnStakedList();
        setLoading(false);
        dispatch(info(`Success to batch withdraw`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to batch withdraw`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to batch withdraw`));
    }
  };

  /** 全部提取质押NFT **/
  const withdrawAllMiners = async () => {
    setLoading(true);
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
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.getReward(minerId);
      if (res && res.data) {
        await getStakedList();
        setLoading(false);
        dispatch(info(`Success to withdraw`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to withdraw`));
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to withdraw`));
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
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.getAllRewards();
      if (res && res.data) {
        await getStakedList();
        setLoading(false);
        dispatch(info(`Success to harvest all`));
      } else {
        setLoading(false);
        dispatch(error(`Fail to harvest all`));
      }
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

  useEffect(() => {
    if (networkId === 97) {
      window.ethereum.enable();
      getUnStakedList();
      getStakedList();
    }
  }, [networkId]);

  return (
    <div id="mine-view">
      <Container
        className="hero-banner-container"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "4.3rem",
        }}
      >
        <Box className="hero-metrics">
          <Grid xs={12} md={12}>
            <Box className="ohm-card-mine">
              <img className="card-banner" src={MineBanner} />
              <Button className={`batch-btn ${isSmallScreen && "isMobile"}`} onClick={getAllRewards}>
                Batch Harvest MBTC
              </Button>
            </Box>
          </Grid>
        </Box>
      </Container>
      <Box
        className="btc-item-container"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          marginLeft: isSmallScreen || isVerySmallScreen ? "0" : "1.6rem",
          marginRight: isSmallScreen || isVerySmallScreen ? "0" : "1.6rem",
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
                  label="UnStaked Miners"
                  value="2"
                />
              </Tabs>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={`btc-item-title-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                    <Box className={`btc-item-right-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                      <Box className="btc-item-right-btn" onClick={handleClick}>
                        Untake Miners
                      </Box>
                      <Box className="btc-item-right-btn" onClick={withdrawAllMiners}>
                        Unstake All
                      </Box>
                    </Box>
                  </Box>
                </Grid>
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
                    {stakedList && stakedList.length > 0 ? (
                      stakedList.map(item => (
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
                              <Box className="btc-card-item-desc-title">#{item.id}</Box>
                              <Box className="btc-card-item-desc-price-box">
                                <Box
                                  className="btc-card-item-desc-price-item"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Box display="flex" flexDirection="column">
                                    <Box className="item-title">MBTC Mined</Box>
                                    <Box className="item-price">{item.earned}</Box>
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
                                    <Box className="item-title">MFuel Cost</Box>
                                    <Box className="item-price">{item.cost}</Box>
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
                      ))
                    ) : (
                      <NoStakedList message="No staked miner, please Stake" />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={`btc-item-title-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                    <Box className={`btc-item-right-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                      <Box className="btc-item-right-btn" onClick={handleClick}>
                        Stake Miners
                      </Box>
                      <Box
                        className="btc-item-right-btn"
                        onClick={() => {
                          stakedList &&
                            batchStakeMiners(
                              stakedList?.map(item => item.id),
                              POOL_ID,
                            );
                        }}
                      >
                        Stake All
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
                    paddingRight: isSmallScreen || isVerySmallScreen ? ".3rem" : "1.4rem",
                    paddingTop: "1.6rem",
                    paddingBottom: "1.6rem",
                  }}
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
                            <Box className="btc-card-item-desc-title">{item.name}</Box>
                            <Box className="btc-card-item-desc-price-box">
                              <Box
                                className="btc-card-item-desc-price-item"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Box display="flex" flexDirection="column">
                                  <Box className="item-title">MBTC Mined2</Box>
                                  <Box className="item-price">{item.earned}</Box>
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
                    {!unStakedList || unStakedList.length == 0 ? (
                      <NoStakedList message="No unstaked miner" />
                    ) : undefined}
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        )}
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
                    <ListItemText id={labelId} primary={item.name} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(item.id)}
                        // checked={checked.indexOf(item.id) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            <Box className="mine-checklist-btn-box">
              <Button color="secondary" onClick={handleClose} className="mine-checklist-btn">
                Choice
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default memo(Mine);
