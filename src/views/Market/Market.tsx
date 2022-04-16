import "./Market.scss";
import { memo } from "react";
import MarketLogo from "./assets/images/market-logo.png";
const Market: React.FC = () => {
  return (
    <div id="market-view">
      <div className="banner-view">
        <div className="banner-icon">
          <img src={MarketLogo} alt="" />
        </div>
        <div className="market-desc">
          <div className="title">META BITCOIN NFT</div>
          <div className="desc">NFT Miner mines MBTC by providing hash power using proof-of-NFT</div>
        </div>
      </div>
    </div>
  );
};
export default memo(Market);
