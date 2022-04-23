import "./style.scss";
import { memo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMediaQuery, SvgIcon } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { ethers } from "ethers";
import { useWeb3Context } from "src/hooks";
import { useDispatch } from "react-redux";
import { NFTStore_ABI, NFTStore_ADDRESS, mFuel_ADDRESS, MFuel_ABI } from "src/contract";
import { error } from "../../slices/MessagesSlice";

type ntcParams = {
  id: string;
};
const Market: React.FC = props => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const history = useHistory();
  const dispatch = useDispatch();
  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  const { id } = useParams<ntcParams>();
  const [listLoading, setLoading] = useState(false);
  const { price, tokenId, status, contract, owner, url } = history.location.state;
  const onBackList = () => {
    history.push("/market");
  };

  /** 购买NFT **/
  const buyNft = async () => {
    setLoading(true);
    try {
      const mFuelContract = new ethers.Contract(mFuel_ADDRESS, MFuel_ABI, signer);
      const storeContract = new ethers.Contract(NFTStore_ADDRESS, NFTStore_ABI, signer);

      const allowance = await mFuelContract.allowance(address, NFTStore_ADDRESS);

      if (allowance.toString() === "0") {
        const approve_tx = await mFuelContract.approve(NFTStore_ADDRESS, ethers.constants.MaxUint256);
        await approve_tx.wait();
      }

      const buy_tx = await storeContract.buy(tokenId, 0);
      await buy_tx.wait();
      history.push("/mynft");

      // if (res && res.data) {
      //   setLoading(false);
      //   dispatch(info(`Success to buy`));
      // } else {
      //   setLoading(false);
      //   dispatch(error(`Fail to buy`));
      // }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(`Fail to buy`));
    }
  };

  return (
    <div
      id="marketDetail-view"
      style={{
        display: isSmallScreen || isVerySmallScreen ? "block" : "flex",
      }}
    >
      <div
        className="back-view"
        onClick={onBackList}
        style={{
          display: isSmallScreen || isVerySmallScreen ? "none" : "block",
        }}
      >
        <SvgIcon fontSize="large" htmlColor="#FFFFFF" component={ArrowBackIosRoundedIcon} />
      </div>
      <div
        className="market-item"
        style={{
          width: isSmallScreen || isVerySmallScreen ? "100%" : "500px",
          marginBottom: isSmallScreen || isVerySmallScreen ? "30px" : "0",
        }}
      >
        <div className="market-item-banner">
          <img src={url} alt="" />
        </div>
        <div className="market-item-title overflow-more">Meta-Intel Pentium 4 #{tokenId}</div>
        <div className="market-detail-desc">
          <div className="item">
            <div className="title overflow-more">CONTRACT ADDRESS</div>
            <div className="desc overflow-more">12312314353453</div>
          </div>
          <div className="item">
            <div className="title overflow-more">CONTRACT ADDRESS</div>
            <div className="desc overflow-more">4353453</div>
          </div>
          <div className="item">
            <div className="title overflow-more">CONTRACT ADDRESS</div>
            <div className="desc overflow-more">12312314353453</div>
          </div>
        </div>
      </div>
      <div className="market-empty"></div>
      <div
        className="market-box-right"
        onClick={buyNft}
        style={{
          width: isSmallScreen || isVerySmallScreen ? "100%" : "500px",
        }}
      >
        <div className="market-box-right-item top-item">
          <div className="market-right-detail-title overflow-more">Meta-Intel Pentium 4 #{tokenId}</div>
          <div className="market-right-detail-desc">
            <p className="tng-text">The Next Generation Crypto</p>
            <p className="tng-text">The Next Generation Crypto</p>
            <p className="tng-text">The Next Generation Crypto</p>
          </div>
          <div className="market-right-detail-price">
            <div className="market-right-detail-price-title">Price</div>
            <div className="market-right-detail-price-desc">
              1.0
              <span>(~420.96 USD）</span>
            </div>
          </div>
          <div className="market-right-detail-buy">BUY</div>
        </div>
        <div className="market-box-right-item top-item ower-item">
          <div className="ower-item-title">Owner</div>
          <div className="ower-item-number overflow-more">452453546sgfsgsshgss</div>
        </div>
      </div>
    </div>
  );
};
export default memo(Market);
