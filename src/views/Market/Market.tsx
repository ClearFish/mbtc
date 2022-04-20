import "./Market.scss";
import { memo, useState, useEffect } from "react";
import MarketLogo from "./assets/images/market-logo.png";
import MarketDemoIcon from "./assets/images/demo.png";
import { useMediaQuery, Grid, Link } from "@material-ui/core";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useWeb3Context } from "src/hooks";
import { useHistory } from "react-router-dom";
import { NFTMiner_ADDRESS } from "src/contract";
interface NFT {
  id: string;
  owner: string;
  price?: string;
  status?: string;
  createAt?: string;
}

const Market: React.FC = () => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const { networkId, address, provider, connected } = useWeb3Context();
  usePathForNetwork({ pathName: "market", networkID: networkId, history });

  const [nftList, setNftList] = useState<NFT[]>([]);
  const [listLoading, setListLoading] = useState(false);
  console.log({ listLoading });

  const getList = async () => {
    setListLoading(true);
    const centralApi = "https://admin.meta-backend.org/system/open/api/nft/order/pending";
    const { data } = await fetch(centralApi, {
      method: "post",
      body: JSON.stringify({
        contract: NFTMiner_ADDRESS,
        pageNum: 1,
        pageSize: 10,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(res => {
      return res.json();
    });
    setNftList(
      data
        .map((item: any) => item.nftlist)
        .flat()
        .map((item: any) => {
          return {
            ...item,
            id: 1,
          };
        }),
    );
    setListLoading(false);
  };

  useEffect(() => {
    getList();
  }, [networkId]);
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
          }}
        >
          <Grid container className="title-container">
            <Grid item xs={12} md={8}>
              <div
                className="select-box"
                style={{
                  width: isSmallScreen || isVerySmallScreen ? "100%" : "25rem",
                  marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "0",
                }}
              >
                <div className="select-item">Open Market</div>
                <div className="select-item">New Releases</div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              justifyContent="flex-end"
              style={{
                display: "flex",
              }}
            >
              <div className="view-box">view all</div>
            </Grid>
          </Grid>
          <div className="btc-card-box">
            {nftList.map(item => {
              return (
                <Link href={`#/marketDetail/${item.id}`} underline="none">
                  <div className="btc-card-item" key={item.id}>
                    <div className="btc-card-item-img">
                      <img src={MarketDemoIcon} alt="" />
                    </div>
                    <div className="btc-card-item-title">Meta Bitcoin NFT</div>
                    <div className="btc-card-item-desc">Asking price</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Market);
