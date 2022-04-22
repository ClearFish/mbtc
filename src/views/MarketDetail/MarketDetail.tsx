import "./style.scss";
import { memo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
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

  /** 购买NFT **/
  const buyNft = async (tokenId: string) => {
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
        className="market-item"
        style={{
          width: isSmallScreen || isVerySmallScreen ? "100%" : "500px",
          marginBottom: isSmallScreen || isVerySmallScreen ? ".5rem" : "0",
        }}
      >
        <div className="market-item-banner">
          <img src={url} alt="" />
        </div>
        <div className="market-item-title overflow-more">Meta-Intel Pentium 4 #{tokenId}</div>
        <div className="market-item-desc overflow-more">Asking price: {price}</div>
      </div>
      <div className="market-empty "></div>
      <div
        className={`${isSmallScreen || isVerySmallScreen ? "Mobile" : "market-buy-btn"}`}
        onClick={() => {
          buyNft(tokenId);
        }}
      >
        BUY
      </div>
    </div>
  );
};
export default memo(Market);
