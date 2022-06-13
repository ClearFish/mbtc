import "./Market.scss";
import { memo, useState, useEffect, useCallback } from "react";
import MarketLogo from "./assets/images/market-logo.png";
import { ReactComponent as MarketGroup } from "./assets/images/MarketGroup.svg";
import { Box, useMediaQuery, SvgIcon, Tooltip, Select, MenuItem, Typography } from "@material-ui/core";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useWeb3Context } from "src/hooks";
import { useHistory } from "react-router-dom";
import { NFTMiner_ABI, NFTMiner_ADDRESS } from "src/contract";
import { ethers } from "ethers";
import metaintelp4 from "../MyNft/assets/metaintelp4.png";
import { ReactComponent as empty } from "../Mine/assets/images/empty.svg";
import { t } from "@lingui/macro";
interface NFT {
  tokenId: string;
  owner: string;
  price?: string;
  status?: string;
  createAt?: string;
  url?: string;
  listTime?: string;
}

export const NoStakedList = ({ message }: { message: string }) => (
  <Box className="NoStaked-box">
    <SvgIcon style={{ fontSize: 40 }} className="icon" component={empty} htmlColor="#868B93" />
    {message}
  </Box>
);

const Market: React.FC = () => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  usePathForNetwork({ pathName: "market", networkID: networkId, history });

  const [nftList, setNftList] = useState<NFT[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [listLoading, setListLoading] = useState(false);

  const [owner, setOwner] = useState(0);
  const [volume, seVolume] = useState(0);
  const [order, setOrder] = useState("createAt");
  const [orderList, setOrderList] = useState([
    {
      value: "tokenId",
      text: t`TokenId`,
      asc: true,
    },
    {
      value: "price",
      text: t`Price`,
      asc: true,
    },
    {
      value: "createAt",
      text: t`Date`,
      asc: true,
    },
  ]);

  /** nft展示前缀 **/
  const getTokenURI = async (tokenId: string) => {
    const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    const res = await nftMinerContract.tokenURI(tokenId);
    return res;
  };

  const getList = useCallback(async () => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/order/pending";
      await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            contract: NFTMiner_ADDRESS,
            pageNum: pageNum,
            pageSize: pageSize,
            orderByColumn: order,
            isAsc: orderList.filter(item => item.value === order)[0].asc ? "asc" : "desc",
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
          const { nftlist, total } = res.data;
          if (pageNum === 1) {
            setNftList(
              nftlist.map((item: any) => {
                return {
                  ...item,
                  url: metaintelp4,
                };
              }),
            );
          } else {
            setNftList([
              ...nftList,
              ...nftlist.map((item: any) => {
                return {
                  ...item,
                  url: metaintelp4,
                };
              }),
            ]);
          }

          setTotal(total);
          setListLoading(false);
        });
    } catch (error) {
      console.log(error);
      setListLoading(false);
    }
  }, [order, orderList, pageNum, pageSize]);

  const getOwners = async () => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/market/nft/owners/" + NFTMiner_ADDRESS;
      fetch(centralApi, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setOwner(res.data || 0);
        })
        .catch(err => {
          setOwner(0);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getMarketVolume = async () => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/market/totalVolume";
      fetch(centralApi, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          seVolume(res.data || 0);
        })
        .catch(err => {
          seVolume(0);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const changeOrder = async (e: any) => {
    try {
      if (e.target.value || (e.target.classList && e.target.classList.contains("order-list"))) {
        await setPageNum(1);
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

  type tFormatter = (num: number) => string | number;
  const kFormatter: tFormatter = (num: number) => {
    const abs = +(Math.abs(num) / 1000).toFixed(2);
    const sign = Math.sign(num);
    return num > 999 ? sign * abs + "k" : num;
  };

  const goToDetail = (info: NFT) => {
    history.push(`/marketDetail/${info.tokenId}`, info);
  };

  useEffect(() => {
    if (provider && address && networkId === 56) {
      getList();
      getOwners();
      getMarketVolume();
    }
  }, [networkId, connected, address]);

  useEffect(() => {
    if (pageNum === 1) {
      getList();
    } else {
      setPageNum(1);
    }
  }, [order, orderList]);

  useEffect(() => {
    getList();
  }, [pageNum]);

  const scrollHandler = async () => {
    const targetNode = document.getElementById("market-view");
    //窗口高度
    const windowHeight = targetNode?.clientHeight || 0;
    //滚动高度
    const scrollTop = targetNode?.scrollTop || 0;
    //页面高度
    const documentHeight = targetNode?.scrollHeight || 0;

    if (windowHeight + scrollTop >= documentHeight) {
      console.log("页面触底啦");
      if (listLoading) {
        return;
      }
      if (nftList.length < total) {
        await setListLoading(true);
        await setPageNum(pageNum + 1);
        await getList();
        await setListLoading(false);
      }
    }
  };

  return (
    <div id="market-view" onScroll={scrollHandler}>
      <div
        className="banner-view"
        style={{
          height: isSmallScreen || isVerySmallScreen ? "auto" : "28rem",
        }}
      >
        <div
          className="market-desc"
          style={{
            width: isSmallScreen || isVerySmallScreen ? "100%" : "25rem",
            position: isSmallScreen || isVerySmallScreen ? "unset" : "absolute",
          }}
        >
          <div className="title">META BITCOIN NFT</div>
          <div className="desc">NFT Miner mines MBTC by providing hash power using proof-of-NFT</div>
          <div className="msg-view">
            {/* <div className="msg-item">
              <SvgIcon
                style={{ fontSize: 10 }}
                className="icon"
                component={MarketUser}
                htmlColor="#868B93"
                viewBox="0 0 40 40"
              />
              <div className="msg-item-right">
                <Tooltip title={owner}>
                  <div className="msg-item-text overflow-more">{kFormatter(owner)}</div>
                </Tooltip>
                <div className="msg-item-desc">Owners</div>
              </div>
            </div> */}
            <div className="msg-item">
              <SvgIcon className="icon" component={MarketGroup} htmlColor="#868B93" viewBox="0 0 40 40" />
              <div className="msg-item-right">
                <Tooltip title={volume}>
                  <div className="msg-item-text overflow-more">{kFormatter(volume)}</div>
                </Tooltip>
                <div className="msg-item-desc">Volume traded</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="banner-icon"
          style={{
            width: isSmallScreen || isVerySmallScreen ? "100%" : "23rem",
            position: isSmallScreen || isVerySmallScreen ? "unset" : "absolute",
            height: isSmallScreen || isVerySmallScreen ? "auto" : "280px",
          }}
        >
          <img src={MarketLogo} alt="" />
        </div>
      </div>
      <div
        className="layout-market"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "1.4rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "1.4rem",
        }}
      >
        <div
          className="btc-container"
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "1rem" : "1.4rem",
          }}
        >
          <div className="btc-card-con">
            {nftList && nftList.length > 0 && (
              <Box style={{ width: "100%", overflow: "hidden", marginBottom: "1rem" }}>
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
            )}
            {nftList && nftList.length > 0 ? (
              <div className="btc-card-box">
                {nftList?.map(item => {
                  return (
                    <div
                      className="btc-card-item"
                      key={item.tokenId}
                      style={{
                        width: isSmallScreen || isVerySmallScreen ? "100%" : "",
                      }}
                      onClick={() => {
                        goToDetail(item);
                      }}
                    >
                      <div className="btc-card-item-img">
                        <img src={item.url} alt="" />
                      </div>
                      <div className="btc-card-item-desc">
                        <span>{item.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <NoStakedList message="No nft，please Sell some" />
            )}
            <Box hidden={!listLoading}>
              <Typography style={{ padding: "2rem 0" }}>Loading More ...</Typography>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Market);
