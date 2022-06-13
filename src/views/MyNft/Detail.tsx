import "./style.scss";
import { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Dialog,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
// import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { ethers } from "ethers";
import { useWeb3Context } from "src/hooks";
import { useDispatch } from "react-redux";
import {
  NFTStore_ABI,
  NFTStore_ADDRESS,
  MFuel_ABI,
  NFTMiner_ADDRESS,
  mFuel_ADDRESS,
  NFTMiner_ABI,
  BUSD_ADDRESS,
  mBTC_ADDRESS,
  NFTRepository_ADDRESS,
  NFTRepository_ABI,
} from "src/contract";
import { error, info } from "../../slices/MessagesSlice";
import CopyIcon from "./assets/Copy.png";
import Vector from "./assets/Vector.png";
import copy from "copy-to-clipboard";
import metaintelp4 from "./assets/metaintelp4.png";
import { Input, PrimaryButton } from "@olympusdao/component-library";
import { t } from "@lingui/macro";
interface NFT {
  baseToken?: string;
  contract: string;
  createAt: number;
  giftCode: number;
  owner: string;
  price: number;
  status: number;
  tokenId: number;
  url: string;
  attributes?: {
    consumption?: string;
    hashrate?: string;
    version?: string;
  };
  name?: string;
  description?: string;
  busd?: string;
  url4k?: string;
  minerUsdtPrice?: number;
}

const Market: React.FC = props => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const history = useHistory();
  const dispatch = useDispatch();
  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  const [loading, setLoading] = useState(false);
  const [nftDetail, setNftDetail] = useState<NFT>({
    baseToken: "",
    contract: "",
    createAt: 0,
    giftCode: 0,
    owner: "",
    price: 0,
    status: 0,
    tokenId: 0,
    url: "",
    attributes: {},
  });
  const [price, setPrice] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [disabled2, setDisabled2] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [baseToken, setBaseToken] = useState<string>("busd");
  const [decimals, setDecimals] = useState<number>(18);

  const goCopy = (text: string) => {
    if (copy(text)) {
      dispatch(info(t`Copied!`));
    } else {
      dispatch(error(t`Failed, please click to Copy!`));
    }
  };
  const downloadCurrentImage = (url?: string, name?: string) => {
    if (url) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.download = name + ".png";
        a.href = url;
        a.click();
      };
      image.src = url;
    }
  };

  const getDetail = async () => {
    setLoading(true);
    const pathTokenId = /mynft\/(.*)/.exec(history.location.pathname);
    let newNftDetail;
    if (pathTokenId && pathTokenId[1]) {
      if (history.location.state?.url) {
        // 从上个页面获取基础信息
        newNftDetail = { ...history.location.state, owner: address };
      } else {
        // 从列表获取基础信息
        newNftDetail = {
          tokenId: pathTokenId[1],
          url: metaintelp4,
          owner: address,
        };
      }

      // 获取右侧信息
      const rightInfo = await getRight(pathTokenId[1], address);

      // 获取价格信息
      // const mbtcPrice = await getMBTCPrice();
      // const mfuelPrice = await getMFUELPrice();

      // 获取最低价格
      const repositoryContract = new ethers.Contract(NFTRepository_ADDRESS, NFTRepository_ABI, signer);

      const minerUsdtPrice = await repositoryContract.getMinerUsdtPrice(pathTokenId[1]);

      setNftDetail({
        ...newNftDetail,
        attributes: rightInfo?.attributes,
        url: rightInfo?.image,
        url4k: rightInfo?.image,
        name: rightInfo?.name,
        contract: rightInfo?.contract,
        description: rightInfo?.description,
        minerUsdtPrice: minerUsdtPrice.toNumber(),
        // busd: rightInfo?.baseToken === "mbtc" ? mbtcPrice : mfuelPrice,
      });

      // 获取默认decimals
      const mFuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);
      const decimals = await mFuelContract.decimals();
    } else {
      dispatch(error(t`Invalid tokenId`));
      // history.push("/market");
    }
    setLoading(false);
  };

  const getRight = async (tokenId: string, owner: string) => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/info";
      return fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            // contract: NFTMiner_ADDRESS,
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

  /** 中心化入库 **/
  const afterSell = async (tokenId: number, price: string, baseToken: string) => {
    const centralApi = "https://admin.meta-backend.org/system/open/api/nft/order/sell";
    await fetch(centralApi, {
      method: "post",
      body: JSON.stringify({
        sign: "",
        data: JSON.stringify({
          owner: address,
          contract: NFTMiner_ADDRESS,
          tokenId: tokenId,
          price: price,
          status: 0,
          createdAt: Date.now(),
          baseToken: baseToken,
        }),
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(res => {
      return res.json();
    });
  };

  /** sell nft **/
  const sellNft = async (tokenId: number, price: string, baseToken: string) => {
    setLoading(true);
    try {
      const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
      const storeContract = new ethers.Contract(NFTStore_ADDRESS, NFTStore_ABI, signer);

      const isApprovedForall = await nftMinerContract.isApprovedForAll(address, NFTStore_ADDRESS);

      if (!isApprovedForall) {
        const miner_approve_tx = await nftMinerContract.setApprovalForAll(NFTStore_ADDRESS, true);
        await miner_approve_tx.wait();
        console.log("miner approved");
      }

      const formatPrice = ethers.utils.parseEther(price);

      const sell_tx = await storeContract.sell(
        tokenId,
        baseToken === "busd" ? BUSD_ADDRESS : baseToken === "mbtc" ? mBTC_ADDRESS : mFuel_ADDRESS,
        0,
        formatPrice,
      );
      await sell_tx.wait();

      // 中心化入库
      await afterSell(tokenId, price, baseToken);

      setLoading(false);
      dispatch(info(t`Success to sell`));
      history.push("/mynft");
    } catch (err) {
      setLoading(false);
      dispatch(error(t`Fail to sell`));
    }
    setLoading(false);
  };

  /** transfer nft **/
  const transferNft = async (to: string, tokenId: number) => {
    setLoading(true);
    try {
      const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
      const transfer_tx = await nftMinerContract.transferFrom(address, to, tokenId);
      await transfer_tx.wait();
      setLoading(false);
      history.push("/mynft");
      dispatch(info(t`Success to transfer`));
    } catch (err) {
      setLoading(false);
      dispatch(error(t`Fail to transfer`));
    }
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleSell = () => {
    if (!disabled) {
      sellNft(nftDetail.tokenId, price, baseToken);
    }
    setOpen(false);
    setPrice("");
  };

  const handleTransfer = () => {
    if (!disabled2) {
      transferNft(address2, nftDetail.tokenId);
    }
    setOpen2(false);
    setAddress2("");
  };

  const handleClose = () => {
    setOpen(false);
    setPrice("");
  };

  const handleClose2 = () => {
    setOpen2(false);
    setAddress2("");
  };

  const handleChangePrice = (e: any) => {
    const price = Number(e.target.value);
    if (e.target.value !== "" && typeof price === "number" && price >= 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (e.target.value.split(".")[1]?.length > 8) {
    } else {
      setPrice(e.target.value);
    }
  };
  const handleChangeAddress = (e: any) => {
    if (e.target.value !== "") {
      setDisabled2(false);
    } else {
      setDisabled2(true);
    }
    setAddress2(e.target.value);
  };

  const handleBaseToken = (e: any) => {
    setBaseToken(e.target.value);
  };

  useEffect(() => {
    if (provider && address && networkId === 56) {
      getDetail();
    }
  }, [networkId, connected]);

  // 是否大于最低价格
  const validated = price.length > 0 && parseInt(price) >= (nftDetail.minerUsdtPrice || 0);

  return (
    <div id="marketDetail-view">
      {loading ? (
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20% 0" }}>
          <CircularProgress />
          <Typography variant="h5" style={{ marginLeft: "1rem" }}>
            {t`Communicating with blockchain nodes...`}
          </Typography>
        </Box>
      ) : (
        <div
          style={{
            display: isSmallScreen || isVerySmallScreen ? "block" : "flex",
          }}
          className="marketDetail-container"
        >
          <div
            className="market-item"
            style={{
              width: isSmallScreen || isVerySmallScreen ? "100%" : "500px",
              marginBottom: isSmallScreen || isVerySmallScreen ? "30px" : "0",
            }}
          >
            <div className="market-item-banner">
              <img src={nftDetail.url} alt="" />
            </div>
            <div className="market-item-title overflow-more">
              {t`Meta-Intel Pentium 4`} #{nftDetail.tokenId}
            </div>
            <div className="market-detail-desc">
              <div className="item">
                <div className="title overflow-more">{t`CONTRACT ADDRESS`}</div>
                <div className="desc-box">
                  <div className="desc overflow-more">{nftDetail.contract}</div>
                  <div className="small-icon" onClick={() => goCopy("12312314353453qweqweqweqeqweqwrwerw")}>
                    <img src={CopyIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="title overflow-more">{t`ORIGINAL`}</div>
                <div className="desc-box">
                  <div className="desc overflow-more">4000 x 4000</div>
                  <div
                    className="small-icon"
                    onClick={() => downloadCurrentImage(nftDetail.url4k, `MetaIntelPentium4#${nftDetail.tokenId}`)}
                  >
                    <img src={Vector} alt="" />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="title overflow-more">{t`TOKEN ID`}</div>
                <div className="desc overflow-more">
                  <div className="desc-box">
                    <div className="desc overflow-more">{nftDetail.tokenId}</div>
                  </div>
                </div>
              </div>
              {/* <div className="item">
              <div className="title overflow-more">IPFS JSON</div>
              <div className="desc overflow-more">
                <div className="desc-box">
                  <div className="desc overflow-more">https://cloudflare-ipfs.cont....</div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
          <div className="market-empty"></div>
          <div
            className="market-box-right"
            style={{
              width: isSmallScreen || isVerySmallScreen ? "100%" : "500px",
            }}
          >
            <div className="market-box-right-item top-item">
              <div className="market-right-detail-title overflow-more">
                {t`Meta-Intel Pentium 4`} #{nftDetail.tokenId}
              </div>
              <div className="market-right-detail-desc">
                <p className="tng-text">
                  {t`Description:`} {nftDetail.description}
                </p>
                <p className="tng-text">
                  {t`Hashrate:`} {nftDetail.attributes?.hashrate}
                </p>
                <p className="tng-text">
                  {t`Consumption:`} {nftDetail.attributes?.consumption}
                </p>
              </div>
              <Grid container spacing={2}>
                <Grid item>
                  <div className="market-right-detail-buy" onClick={handleOpen2}>
                    {t`Transfer`}
                  </div>
                </Grid>
                <Grid item>
                  <div className="market-right-detail-buy" onClick={handleOpen}>
                    {t`Sell`}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="market-box-right-item top-item ower-item">
              <div className="bg"></div>
              <div className="ower-item-title">{t`Owner`}</div>
              <div className="ower-item-number overflow-more">{nftDetail.owner}</div>
            </div>
          </div>
        </div>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" id="set-price-modal" className="zap-card">
        <div className="price-box">
          <FormControl className="slippage-input" variant="outlined" color="primary" size="small">
            <Input
              id="price"
              type="number"
              label={`Sell Meta-Intel Pentium 4 #${nftDetail.tokenId}`}
              value={price}
              onChange={e => handleChangePrice(e)}
            />
            <div className="helper-text" style={{ marginTop: "0.5rem" }} hidden={price.length > 0}>
              <Typography variant="body2" color="textSecondary">
                {t`Please enter the price`}
              </Typography>
            </div>
            <div className="helper-text" style={{ marginTop: "0.5rem" }} hidden={price.length === 0 || validated}>
              <Typography variant="body2" color="textSecondary">
                {t`Please enter the price equal or more than`}
                {nftDetail.minerUsdtPrice}
              </Typography>
            </div>
          </FormControl>
          <FormControl className="slippage-input base-token-form" variant="outlined" color="primary" size="small">
            <Select id="asset-select" value={baseToken} label="BaseToken" onChange={handleBaseToken} disableUnderline>
              <MenuItem value={"busd"}>{t`BUSD`}</MenuItem>
              {/* <MenuItem value={"mbtc"}>MBTC</MenuItem> */}
              {/* <MenuItem value={"mfuel"}>MFUEL</MenuItem> */}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent={"flex-end"}>
            <PrimaryButton
              size="small"
              color="primary"
              disabled={disabled || !validated}
              onClick={handleSell}
              style={{ marginRight: 0 }}
            >
              {t`Sure to Sell`}
            </PrimaryButton>
          </Box>
        </div>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2} fullWidth maxWidth="xs" id="set-price-modal" className="zap-card">
        <div className="price-box">
          <FormControl className="slippage-input" variant="outlined" color="primary" size="small">
            <Input
              id="address2"
              type="string"
              label={`Transfer Meta-Intel Pentium 4 #${nftDetail.tokenId}`}
              value={address2}
              onChange={e => handleChangeAddress(e)}
            />
            <div className="helper-text" style={{ marginTop: "0.5rem" }} hidden={address2.length > 0}>
              <Typography variant="body2" color="textSecondary">
                {t`Please enter the address to transfer`}
              </Typography>
            </div>
          </FormControl>
          <Box display="flex" justifyContent={"flex-end"}>
            <PrimaryButton
              size="small"
              color="primary"
              disabled={disabled2}
              onClick={handleTransfer}
              style={{ marginTop: "1rem", marginRight: 0 }}
            >
              {t`Sure to transfer`}
            </PrimaryButton>
          </Box>
        </div>
      </Dialog>
    </div>
  );
};
export default memo(Market);
