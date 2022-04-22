import "./style.scss";
import { memo, MouseEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
type ntcParams = {
  id: string;
};
const Market: React.FC = props => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const history = useHistory();
  const { id } = useParams<ntcParams>();
  const { price, tokenId, status, contract, owner, url } = history.location.state;
  const onBuy = (event: MouseEvent<HTMLElement>) => {
    // 阻止click冒泡
    event.nativeEvent.stopImmediatePropagation();
    // BUY
  };
  const stopDefaultEvent = (event: MouseEvent<HTMLElement>) => {
    // 阻止click冒泡
    event.nativeEvent.stopImmediatePropagation();
  };
  useEffect(() => {
    // 点击其他地方隐藏输入框
    document.addEventListener("click", () => {
      history.push("/market");
    });
  }, []);

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
        onClick={stopDefaultEvent}
      >
        <div className="market-item-banner">
          <img src={url} alt="" />
        </div>
        <div className="market-item-title overflow-more">Meta Bitcoin NFT -- {tokenId}</div>
        <div className="market-item-desc overflow-more">Asking price: {price}</div>
      </div>
      <div className="market-empty "></div>
      <div className={`${isSmallScreen || isVerySmallScreen ? "Mobile" : "market-buy-btn"}`} onClick={onBuy}>
        BUY
      </div>
    </div>
  );
};
export default memo(Market);
