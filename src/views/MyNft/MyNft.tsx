import "./style.scss";
import { memo, useState, useEffect } from "react";
import MarketDemoIcon from "../Market/assets/images/demo.png";
import { useMediaQuery, Link } from "@material-ui/core";
const Market: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const [cardArr, setCardArr] = useState<number[]>([]);
  useEffect(() => {
    setCardArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);
  return (
    <div id="mynft-view">
      <div className="mynft-title">My NFTs</div>
      <div
        className="btc-card-box"
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "25px",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "25px",
          display: isSmallScreen || isVerySmallScreen ? "block" : "grid",
        }}
      >
        {cardArr.map(el => {
          return (
            <div className="btc-card-item-box">
              <Link href={`#/marketDetail/${el}`} underline="none">
                <div
                  className="btc-card-item"
                  key={el}
                  style={{
                    width: isSmallScreen || isVerySmallScreen ? "100%" : "15rem",
                  }}
                >
                  <div className="btc-card-item-img">
                    <img src={MarketDemoIcon} alt="" />
                  </div>
                  <div className="btc-card-item-title overflow-more">Meta Bitcoin NFT</div>
                  <div className="btc-card-item-desc overflow-more">Asking price</div>
                </div>
              </Link>
              <div className="btc-card-item-footer">
                <div className="btc-card-item-footer-btn">Transfer</div>
                <div className="btc-card-item-footer-btn">Sell</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(Market);
