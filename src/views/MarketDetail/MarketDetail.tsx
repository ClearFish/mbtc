import "./style.scss";
import { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress, useMediaQuery } from "@material-ui/core";
// import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { ethers } from "ethers";
import { useWeb3Context } from "src/hooks";
import { useDispatch } from "react-redux";
import { NFTStore_ABI, NFTStore_ADDRESS, MFuel_ABI, mBTC_ADDRESS, NFTMiner_ADDRESS, mFuel_ADDRESS } from "src/contract";
import { error, info } from "../../slices/MessagesSlice";
import CopyIcon from "./assets/images/Copy.png";
import Vector from "./assets/images/Vector.png";
import copy from "copy-to-clipboard";
import metaintelp4 from "../MyNft/assets/metaintelp4.png";

type ntcParams = {
  id: string;
};

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

  const goCopy = (text: string) => {
    if (copy(text)) {
      dispatch(info("Copied!"));
    } else {
      dispatch(error("Failed, please click to Copy!"));
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

  const getList = async () => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/order/pending";
      return fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          contract: NFTMiner_ADDRESS,
          pageNum: 1,
          pageSize: 10,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          const { nftlist } = res.data;
          return nftlist.map((item: any) => {
            return {
              ...item,
              url: metaintelp4,
            };
          });
        });
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getDetail = async () => {
    setLoading(true);
    const pathTokenId = /marketDetail\/(.*)/.exec(history.location.pathname);
    let newNftDetail;
    let owner = "";
    if (pathTokenId && pathTokenId[1]) {
      if (history.location.state?.owner) {
        // 从上个页面获取基础信息
        newNftDetail = { ...history.location.state };
        owner = history.location.state.owner;
      } else {
        // 从列表获取基础信息
        const nftList = await getList();
        const filtered = nftList.filter((item: any) => item.tokenId === pathTokenId[1]);
        if (filtered.length > 0) {
          newNftDetail = filtered[0];
          owner = filtered[0].owner;
        } else {
          dispatch(error("Nonexistent tokenId"));
          history.push("/market");
          return {};
        }
      }
      // 获取右侧信息
      const rightInfo = await getRight(pathTokenId[1], owner);

      // 获取价格信息
      const mbtcPrice = await getMBTCPrice();
      const mfuelPrice = await getMFUELPrice();

      setNftDetail({
        ...newNftDetail,
        attributes: rightInfo?.attributes,
        url: rightInfo?.image4k,
        name: rightInfo?.name,
        contract: rightInfo?.contract,
        description: rightInfo?.description,
        busd: rightInfo?.baseToken === "mbtc" ? mbtcPrice : mfuelPrice,
      });
    } else {
      dispatch(error("Invalid tokenId"));
      history.push("/market");
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
      dispatch(error("Fail to get info"));
      return {};
    }
  };

  const getMBTCPrice = async () => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/price/mbtc";
      return fetch(centralApi, {
        method: "post",
        body: JSON.stringify({}),
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
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const getMFUELPrice = async () => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/price/mFuel";
      return fetch(centralApi, {
        method: "post",
        body: JSON.stringify({}),
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
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  useEffect(() => {
    if (provider && address && networkId === 97) {
      getDetail();
    }
  }, [networkId, connected]);

  /** 购买NFT **/
  const buyNft = async () => {
    setLoading(true);
    try {
      const mbtcContract = new ethers.Contract(mBTC_ADDRESS, MFuel_ABI, signer);
      const mfuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);
      const storeContract = new ethers.Contract(NFTStore_ADDRESS, NFTStore_ABI, signer);

      const chosenContract = nftDetail.baseToken === "mbtc" ? mbtcContract : mfuelContract;
      const allowance = await chosenContract.allowance(address, NFTStore_ADDRESS);
      if (allowance.toString() === "0") {
        const approve_tx = await chosenContract.approve(NFTStore_ADDRESS, ethers.constants.MaxUint256);
        await approve_tx.wait();
      }
      const buy_tx = await storeContract.buy(Number(nftDetail.tokenId), 0);
      await afterBuy(nftDetail.tokenId, nftDetail.owner);
      await buy_tx.wait();

      history.push("/mynft");
      setLoading(false);
      dispatch(info(`Success to buy`));
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to buy`));
    }
  };

  /** 购买入库 **/
  const afterBuy = async (tokenId: number, owner: string) => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/order/normal";
      return fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            owner: owner,
            tokenId: tokenId,
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
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  return (
    <div id="marketDetail-view">
      {loading ? (
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
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
            <div className="market-item-title overflow-more">Meta-Intel Pentium 4 #{nftDetail.tokenId}</div>
            <div className="market-detail-desc">
              <div className="item">
                <div className="title overflow-more">CONTRACT ADDRESS</div>
                <div className="desc-box">
                  <div className="desc overflow-more">{nftDetail.contract}</div>
                  <div className="small-icon" onClick={() => goCopy("12312314353453qweqweqweqeqweqwrwerw")}>
                    <img src={CopyIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="title overflow-more">ORIGINAL</div>
                <div className="desc-box">
                  <div className="desc overflow-more">4000 x 4000</div>
                  <div
                    className="small-icon"
                    onClick={() => downloadCurrentImage(nftDetail.url, `MetaIntelPentium4#${nftDetail.tokenId}`)}
                  >
                    <img src={Vector} alt="" />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="title overflow-more">TOKEN ID</div>
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
              <div className="market-right-detail-title overflow-more">Meta-Intel Pentium 4 #{nftDetail.tokenId}</div>
              <div className="market-right-detail-desc">
                <p className="tng-text">Description: {nftDetail.description}</p>
                <p className="tng-text">Hashrate: {nftDetail.attributes?.hashrate}</p>
                <p className="tng-text">Consumption: {nftDetail.attributes?.consumption}</p>
              </div>
              <div className="market-right-detail-price">
                <div className="market-right-detail-price-title">Price</div>
                <div className="market-right-detail-price-desc">
                  {nftDetail.price}
                  <span>{` ( ～ ${nftDetail.busd} BUSD ) `}</span>
                </div>
              </div>
              <div className="market-right-detail-buy" onClick={buyNft}>
                BUY
              </div>
            </div>
            <div className="market-box-right-item top-item ower-item">
              <div className="bg"></div>
              <div className="ower-item-title">Owner</div>
              <div className="ower-item-number overflow-more">{nftDetail.owner}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(Market);
