import "./Mine.scss";
import MineBanner from "../../assets/images/mine/mine-banner.png";
import { memo, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { Paper } from "@olympusdao/component-library";
import { Container, useMediaQuery, Box, Grid, makeStyles, Button, Tabs, Tab } from "@material-ui/core";
import { ethers } from "ethers";
import { NFTMiner_ABI, NFTMiner_ADDRESS, MBTCStaking_ADDRESS, MBTCStaking_ABI } from "src/contract";
import { TabPanel, TabContext } from "@material-ui/lab";

const useStyles = makeStyles({
  // 卡片按钮 black white
  blackCardBtnOrange: {
    background: "#d6a241",
  },
  blackCardBtnBlue: {
    background: "#6a40bb",
  },
});
interface NftType {
  name: string;
  image: string;
  mined: string;
  cost: string;
  attributes: [];
}

const Mine: React.FC = () => {
  const history = useHistory();
  // const { address, connect, provider, connected, networkId, providerInitialized } = useWeb3Context();
  // usePathForNetwork({ pathName: "mine", networkID: networkId, history });

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const classes = useStyles();
  const [nftList, setNftList] = useState<NftType[]>();
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  // 获取合约签名
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // 获取所有的NFT信息
  const getNFT = async () => {
    const address = await signer.getAddress();
    const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    const balance = await nftMinerContract.balanceOf(address);
    const tokenURI = await nftMinerContract.tokenURI(1);
    console.log({ tokenURI });
    const newNftList:
      | SetStateAction<NftType[] | undefined>
      | { name: string; image: string; attributes: []; mined: string; cost: string }[] = [];
    for (let i = 0; i < balance; i++) {
      await window
        .fetch(tokenURI)
        .then(res => res.json())
        .then(json => {
          newNftList.push({
            name: json.name,
            image: json.image,
            attributes: json.attributes,
            mined: "12",
            cost: "13",
          });
        });
    }
    setNftList(newNftList);
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

  /** 质押单个NFT **/
  const stakeMiner = async (minerId: string, poolId: string) => {
    const mbtcStakingContract = new ethers.Contract(MBTCStaking_ADDRESS, MBTCStaking_ABI, signer);
    const res = await mbtcStakingContract.stakeMiner(minerId, poolId);
    return res;
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
    getNFT();
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
              <Tab label="Staked Miners" value="1" />
              <Tab label="UnStaked Miners" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className="btc-item-title-container">
                  <Box className="btc-item-right-container">
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
                  paddingRight: isSmallScreen || isVerySmallScreen ? ".3rem" : "1.4rem",
                  paddingTop: "1.6rem",
                  paddingBottom: "1.6rem",
                }}
              >
                {nftList?.map(item => (
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
                          <Box display="flex" alignItems="center">
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
                          <Box display="flex" alignItems="center">
                            <Box className="item-title">MFuel Cost</Box>
                            <Box className="item-price">{item.cost}</Box>
                          </Box>
                          <div className={`btn ${false ? "orange" : "blue"}`}>Unstake</div>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className="btc-item-title-container">
                  <Box className="btc-item-right-container">
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
                {nftList?.map(item => (
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
                          <Box display="flex" alignItems="center">
                            <Box className="item-title">MBTC Mined2</Box>
                            <Box className="item-price">{item.mined}</Box>
                          </Box>
                          <div className={`btn ${false ? "orange" : "blue"}`}>Stake</div>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default memo(Mine);
