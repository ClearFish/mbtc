import "./Market.scss";
import { memo, useState, useEffect } from "react";
import MarketLogo from "./assets/images/market-logo.png";
import { Box, CircularProgress, useMediaQuery } from "@material-ui/core";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useWeb3Context } from "src/hooks";
import { useHistory } from "react-router-dom";
import { NFTMiner_ABI, NFTMiner_ADDRESS } from "src/contract";
import { ethers } from "ethers";
interface NFT {
  tokenId: string;
  owner: string;
  price?: string;
  status?: string;
  createAt?: string;
  url?: string;
}

const Market: React.FC = () => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  usePathForNetwork({ pathName: "market", networkID: networkId, history });

  const [nftList, setNftList] = useState<NFT[]>([]);
  const [total, setTotal] = useState(0);
  const [listLoading, setListLoading] = useState(false);

  /** nft展示前缀 **/
  const getTokenURI = async (tokenId: string) => {
    const nftMinerContract = new ethers.Contract(NFTMiner_ADDRESS, NFTMiner_ABI, signer);
    const res = await nftMinerContract.tokenURI(tokenId);
    return res;
  };

  const getList = async () => {
    try {
      setListLoading(true);
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/order/pending";
      fetch(centralApi, {
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
          const { nftlist, total } = res.data;
          if (nftlist && nftlist.length > 0) {
            const requestBox = [];
            for (let i = 0; i < nftlist?.length || 0; i++) {
              requestBox.push(
                (async () => {
                  console.log({ nnn: nftlist[i] });
                  const tokenURI = await getTokenURI(nftlist[i].tokenId);
                  const tokenURL = await fetch(tokenURI)
                    .then(res => res.json())
                    .then(json => json.image);
                  return {
                    ...nftlist[i],
                    url: tokenURL,
                  };
                })(),
              );
            }
            Promise.all(requestBox).then(res => {
              setNftList(res);
              setTotal(total);
              setListLoading(false);
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const goToDetail = (info: NFT) => {
    history.push(`/marketDetail/${info.tokenId}`, info);
  };

  useEffect(() => {
    if (provider && address && networkId === 97) {
      getList();
    }
  }, [networkId, connected]);

  return (
    <div id="market-view">
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
          {listLoading ? (
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
              <CircularProgress />
            </Box>
          ) : (
            <div className="btc-card-box">
              {nftList.map(item => {
                return (
                  <div
                    onClick={() => {
                      goToDetail(item);
                    }}
                  >
                    <div className="btc-card-item" key={item.tokenId}>
                      <div className="btc-card-item-img">
                        <img src={item.url} alt="" />
                      </div>
                      <div className="btc-card-item-title">Meta Bitcoin NFT -- {item.tokenId}</div>
                      <div className="btc-card-item-desc">Asking price: {item.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(Market);
