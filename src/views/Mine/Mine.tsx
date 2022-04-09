import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";
import { memo, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
// import { Paper } from "@olympusdao/component-library";
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
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ethers } from "ethers";
import { NFTMiner_ABI, NFTMiner_ADDRESS, MBTCStaking_ADDRESS, MBTCStaking_ABI, POOL_ID } from "src/contract";
import { TabPanel, TabContext } from "@material-ui/lab";

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
  name: string;
  image: string;
  mined: string;
  cost: string;
  attributes: [];
  id: string;
}

const Mine: React.FC = () => {
  const history = useHistory();
  // const { address, connect, provider, connected, networkId, providerInitialized } = useWeb3Context();
  // usePathForNetwork({ pathName: "mine", networkID: networkId, history });
  const classes = useStyles();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const [unStakedList, setUnStakedList] = useState<NftType[]>();
  const [stakedList, setStakedList] = useState<NftType[]>();
  const [checkList, setCheckList] = useState<string[]>([]); //选项checklist
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  // 下拉弹框 start
  const [minerItem, setMinerItem] = useState<NftType[]>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const clearCheckList = () => {
    setCheckList([]);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>, value: string) => {
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
    console.log("checkList", checkList);
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
    // const address = await signer.getAddress();
    // const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    // const balance = await nftMinerContract.balanceOf(address);
    // const tokenURI = await nftMinerContract.tokenURI(1);
    // console.log({ tokenURI });
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
      | { name: string; image: string; attributes: []; mined: string; cost: string; id: string }[] = [];
    for (let i = 12; i < 26; i++) {
      newNftList.push({
        name: `test${i}`,
        image: `https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${i}.png`,
        attributes: [],
        mined: "262889.78",
        cost: "1212.12",
        id: `${i}`,
      });
    }
    setUnStakedList(newNftList);
  };

  /** nft展示前缀 **/
  const tokenURI = async (tokenId: string) => {
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
    return res;
  };

  /** 获取已质押nft **/
  const getStakedList = async () => {
    // const stakedNum = await minerAmountOf(addresses);
    const newNftList:
      | SetStateAction<NftType[] | undefined>
      | { name: string; image: string; attributes: []; mined: string; cost: string; id: string }[] = [];
    for (let i = 1; i < 12; i++) {
      newNftList.push({
        name: `test${i}`,
        image: `https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${i}.png`,
        attributes: [],
        mined: "262889.78",
        cost: "1212.12",
        id: `${i}`,
      });
    }
    setStakedList(newNftList);
  };

  /** 质押单个NFT **/
  const stakeMiner = async (minerId: string, poolId: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    try {
      const res = await mbtcStakingContract.stakeMiner(minerId, poolId);
      console.log({ res });
      return res;
    } catch (error) {
      console.log({ error });
    }
  };

  /** 批量质押NFT **/
  const batchStakeMiners = async (minerIds: string[], poolId: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.batchStakeMiners(minerIds, poolId);
    return res;
  };

  /** 质押NFT提取 **/
  const withdrawMiner = async (minerId: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.withdrawMiner(minerId);
    return res;
  };

  /** 批量质押NFT提取 **/
  const batchWithdrawMiners = async (minerIds: string[]) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.batchWithdrawMiners(minerIds);
    return res;
  };

  /** 全部提取质押NFT **/
  const withdrawAllMiners = async () => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.withdrawAllMiners();
    return res;
  };

  /** 提取单个NFT质押收益 **/
  const getReward = async (minerId: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.getReward(minerId);
    return res;
  };

  // 批量提取NFT质押收益
  const batchGetRewards = async (minerIds: string[]) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.batchGetRewards(minerIds);
    return res;
  };

  // 提取全部NFT质押收益
  const getAllRewards = async () => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.getAllRewards();
    return res;
  };

  // 获取指定NFT质押信息
  const stakingInformation = async (minerId: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.stakingInformation(minerId);
    return res;
  };

  useEffect(() => {
    window.ethereum.enable();
    getUnStakedList();
    getStakedList();
  }, []);

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
              <Button className={`batch-btn ${isSmallScreen && "isMobile"}`}>Batch Harvest MBTC</Button>
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
                onClick={e => handleClick(e, "1")}
                aria-describedby={id}
                label="Staked Miners"
                value="1"
              />
              <Tab
                className={`${isSmallScreen || isVerySmallScreen ? "tab-mobile" : ""}`}
                onClick={e => handleClick(e, "2")}
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
                    <Box className="btc-item-right-btn">Untake Miners</Box>
                    <Box className="btc-item-right-btn">Unstake All</Box>
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
                <Grid className="stake-container" container spacing={1} justifyContent="space-between">
                  {stakedList?.map(item => (
                    <Grid item>
                      <Box
                        className="btc-card-item"
                        style={{
                          // marginRight: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                          marginBottom: isSmallScreen || isVerySmallScreen ? "1rem" : "1.6rem",
                        }}
                      >
                        <Box className="btc-card-item-img">
                          <img src={item.image} alt="" />
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
                                <Box className="item-title">MBTC Mined</Box>
                                <Box className="item-price">{item.mined}</Box>
                              </Box>
                              <div className={`btn ${true ? "orange" : "blue"}`}>Harvest</div>
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
                              <div className={`btn ${false ? "orange" : "blue"}`}>Unstake</div>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                  {!stakedList || stakedList.length == 0 ? <Box>stakedList</Box> : undefined}
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className={`btc-item-title-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                  <Box className={`btc-item-right-container ${isSmallScreen || isVerySmallScreen ? "" : "pc"}`}>
                    <Box className="btc-item-right-btn">Stake Miners</Box>
                    <Box className="btc-item-right-btn">Stake All</Box>
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
                {unStakedList?.map(item => (
                  <Box
                    className="btc-card-item"
                    style={{
                      marginRight: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                      marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "1.6rem",
                    }}
                  >
                    <Box className="btc-card-item-img">
                      <img src={item.image} alt="" />
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
                            <Box className="item-price">{item.mined}</Box>
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
                ))}
                {!unStakedList || unStakedList.length == 0 ? <Box>stakedList</Box> : undefined}
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
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
                      <Avatar alt={item.name} src={item.image} />
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
    </div>
  );
};

export default memo(Mine);
