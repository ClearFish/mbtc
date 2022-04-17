import "./Market.scss";
import { memo } from "react";
import MarketLogo from "./assets/images/market-logo.png";
const Market: React.FC = () => {
  return (
    <div id="market-view">
      <div className="banner-view">
        <div className="market-desc">
          <div className="title">META BITCOIN NFT</div>
          <div className="desc">
            NFT Miner mines MBTC by providing hash power using
            <br /> proof-of-NFT
          </div>
        </div>
        <div className="banner-icon">
          <img src={MarketLogo} alt="" />
        </div>
      </div>
      <div className="layout-market">
        <div className="btc-container">
          <div className="title-container">
            <div className="select-box">
              <div className="select-item">Open Market</div>
              <div className="select-item">New Releases</div>
            </div>
            <div className="view-box">view all</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Market);
