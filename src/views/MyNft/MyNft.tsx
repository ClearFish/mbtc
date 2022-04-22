import "./style.scss";
import { memo, useState, useEffect } from "react";
import { useMediaQuery, Dialog, FormControl, Box, Typography, CircularProgress } from "@material-ui/core";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useHistory } from "react-router-dom";
import {
  mBTC_ADDRESS,
  MFuel_ABI,
  mFuel_ADDRESS,
  NFTMiner_ABI,
  NFTMiner_ADDRESS,
  NFTStore_ABI,
  NFTStore_ADDRESS,
} from "src/contract";
import { ethers } from "ethers";
import { Input, PrimaryButton } from "@olympusdao/component-library";
import { useDispatch } from "react-redux";
import { error, info } from "../../slices/MessagesSlice";
import BigNumber from "bignumber.js";
import metaintelp4 from "./assets/metaintelp4.png";

interface NftType {
  name?: string;
  url: string;
  earned?: string;
  cost?: string;
  attributes?: [];
  tokenId: string;
}

const Market: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const dispatch = useDispatch();
  const [price, setPrice] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [tokenId, setTokenId] = useState<string>("");
  const [listLoading, setListLoading] = useState(false);
  const [unStakedList, setUnStakedList] = useState<NftType[]>();
  const history = useHistory();
  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  usePathForNetwork({ pathName: "mynft", networkID: networkId, history });

  /** nft展示前缀 **/
  const getTokenURI = async (tokenId: string) => {
    const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    const res = await nftMinerContract.tokenURI(tokenId);
    return res;
  };

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
        tokenIds.map((item: string) => {
          return {
            tokenId: item,
            url: metaintelp4,
          };
        }),
      );
      setListLoading(false);
    } catch (err) {
      console.log({ err });
      setListLoading(false);
      dispatch(error(`Fail to get list`));
    }
  };

  /** 获取未质押nft 原正常请求逻辑 **/
  const getUnStakedListNormal = async () => {
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
      const requestBox = [];
      for (let i = 0; i < tokenIds?.length || 0; i++) {
        requestBox.push(
          (async () => {
            const tokenURI = await getTokenURI(tokenIds[i]);
            const tokenURL = await fetch(tokenURI)
              .then(res => res.json())
              .then(json => json.image);
            return {
              tokenId: tokenIds[i],
              url: tokenURL,
            };
          })(),
        );
      }
      Promise.all(requestBox).then(res => {
        setUnStakedList(res);
        setListLoading(false);
      });
    } catch (err) {
      console.log({ err });
      setListLoading(false);
      dispatch(error(`Fail to sell`));
    }
  };

  /** sell nft **/
  const sellNft = async (tokenId: string, price: string) => {
    setListLoading(true);
    try {
      const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
      const storeContract = new ethers.Contract(NFTStore_ADDRESS, NFTStore_ABI, signer);
      const mFuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);

      const isApprovedForall = await nftMinerContract.isApprovedForAll(address, NFTStore_ADDRESS);
      console.log("isApprovedForall ", isApprovedForall);

      if (!isApprovedForall) {
        const miner_approve_tx = await nftMinerContract.setApprovalForAll(NFTStore_ADDRESS, true);
        await miner_approve_tx.wait();
        console.log("miner approved");
      }

      const decimals = await mFuelContract.decimals();
      const formatPrice = new BigNumber(price).multipliedBy(Math.pow(10, decimals)).toString();

      const sell_tx = await storeContract.sell(tokenId, mBTC_ADDRESS, 0, formatPrice);
      // await sell_tx.wait();

      // 中心化入库
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/order/sell";
      await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          owner: address,
          contract: NFTMiner_ADDRESS,
          tokenId: tokenId,
          price: price,
          status: 0,
          createdAt: 10,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      await getUnStakedList();
      setListLoading(false);
      dispatch(info(`Success to sell`));
    } catch (err) {
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (provider && address && networkId === 97) {
      getUnStakedList();
    }
  }, [networkId, connected]);

  const handleSell = (tokenId: string) => {
    setOpen(true);
    setTokenId(tokenId);
  };

  const handleClose = () => {
    if (!disabled) {
      sellNft(tokenId, price);
    }
    setOpen(false);
    setPrice("");
  };

  const handleChangePrice = (e: any) => {
    const price = Number(e.target.value);
    if (e.target.value !== "" && typeof price === "number" && price >= 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setPrice(e.target.value);
  };

  return (
    <div id="mynft-view">
      <div className="mynft-title">My NFTs</div>
      {listLoading ? (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20%",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div
          className="btc-card-box"
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "25px",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "25px",
            display: isSmallScreen || isVerySmallScreen ? "block" : "grid",
          }}
        >
          {unStakedList &&
            unStakedList.map(el => {
              return (
                <div className="btc-card-item-box">
                  <div>
                    <div
                      className="btc-card-item"
                      key={el.tokenId}
                      style={{
                        width: isSmallScreen || isVerySmallScreen ? "100%" : "15rem",
                      }}
                    >
                      <div className="btc-card-item-img">
                        <img src={el.url} alt="" />
                      </div>
                      <div className="btc-card-item-title overflow-more">Meta-Intel Pentium 4 #{el.tokenId}</div>
                    </div>
                  </div>
                  <div className="btc-card-item-footer">
                    <div className="btc-card-item-footer-btn">Transfer</div>
                    <div
                      className="btc-card-item-footer-btn"
                      onClick={() => {
                        handleSell(el.tokenId);
                      }}
                    >
                      Sell
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" id="set-price-modal" className="zap-card">
        <div className="price-box">
          <FormControl className="slippage-input" variant="outlined" color="primary" size="small">
            <Input
              id="price"
              type="number"
              label={`Sell NFT-${tokenId}`}
              value={price}
              onChange={e => handleChangePrice(e)}
            />
            <div className="helper-text" style={{ marginTop: "0.5rem" }} hidden={price.length > 0}>
              <Typography variant="body2" color="textSecondary">
                Please enter the price
              </Typography>
            </div>
          </FormControl>
          <Box display="flex" justifyContent={"flex-end"}>
            <PrimaryButton
              size="small"
              color="primary"
              disabled={disabled}
              onClick={handleClose}
              style={{ marginTop: "1rem", marginRight: 0 }}
            >
              Sure to Sell
            </PrimaryButton>
          </Box>
        </div>
      </Dialog>
    </div>
  );
};
export default memo(Market);
