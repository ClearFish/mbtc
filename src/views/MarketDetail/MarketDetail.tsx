import "./style.scss";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import MarketLogo from "../Market/assets/images/demo.png";
type ntcParams = {
  id: string;
};
const Market: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const { id } = useParams<ntcParams>();
  return (
    <div
      id="marketDetail-view"
      style={{
        display: isSmallScreen || isVerySmallScreen ? "block" : "flex",
      }}
    >
      <div
        className="market-item"
        style={{
          width: isSmallScreen || isVerySmallScreen ? "100%" : "500px",
          marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "0",
        }}
      >
        <div className="market-item-banner">
          <img src={MarketLogo} alt="" />
        </div>
        <div className="market-item-title overflow-more">Meta Bitcoin NFT -- {id}</div>
        <div className="market-item-desc overflow-more">Asking price</div>
      </div>
      <div className="market-empty "></div>
      <div className={`${isSmallScreen || isVerySmallScreen ? "Mobile" : "market-buy-btn"}`}>BUY</div>
    </div>
  );
};
export default memo(Market);
