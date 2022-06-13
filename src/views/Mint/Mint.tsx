import "./Mint.scss";
import React, { memo, useEffect, useState } from "react";
import { Button, Container, useMediaQuery, Backdrop, CircularProgress, Typography } from "@material-ui/core";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useWeb3Context } from "src/hooks/web3Context";
import metaintelp4 from "../MyNft/assets/metaintelp4.png";
import { ethers } from "ethers";
import { ERC20_ADDRESS, IERC20_ABI, Mint_ABI, Mint_ADDRESS } from "src/contract";
import { error, info } from "../../slices/MessagesSlice";
import { t } from "@lingui/macro";
import { Input } from "@olympusdao/component-library";

const Mint: React.FC = () => {
  const history = useHistory();
  const { networkId, address, provider, connected } = useWeb3Context();
  const signer = provider.getSigner();
  usePathForNetwork({ pathName: "mint", networkID: networkId, history });
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 860px)");
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");

  const handleChangeNum = (e: any) => {
    const val = Number(e?.target?.value || e);
    if (val >= 0 && val <= Number(balance)) {
      setNum(val);
    }
  };

  const getBalance = async () => {
    const ERC20Contract = new ethers.Contract(ERC20_ADDRESS, IERC20_ABI, signer);
    const balance = await ERC20Contract.balanceOf(address);
    setBalance(ethers.utils.formatEther(balance));
  };

  const checkMintApproved = async () => {
    // 检查代币（ERC20）是否授权
    try {
      const ERC20Contract = new ethers.Contract(ERC20_ADDRESS, IERC20_ABI, signer);
      const allowance = await ERC20Contract.allowance(address, Mint_ADDRESS);
      if (allowance.toString() === "0" || allowance.toString().length < 1) {
        const approve_tx = await ERC20Contract.approve(Mint_ADDRESS, ethers.constants.MaxUint256);
        return await approve_tx.wait();
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mintHandler = async () => {
    setLoading(true);
    try {
      const res = await checkMintApproved();
      if (!res) {
        dispatch(error(t`Fail to mint`));
        return;
      }
      const mintContract = new ethers.Contract(Mint_ADDRESS, Mint_ABI, signer);
      const mintTx = await mintContract.SafeMintMiners(num, 0);
      await mintTx.wait();
      dispatch(info(t`Success to mint`));
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
      dispatch(error(t`Fail to mint`));
    }
  };

  useEffect(() => {
    try {
      if (provider && address && networkId === 56) {
        getBalance();
      }
    } catch (err) {
      console.log(err);
    }
  }, [networkId, connected, address]);

  return (
    <div id="mint-view" className={isSmallScreen ? "isMobile" : ""}>
      <Container
        className="hero-banner-container"
        style={{
          paddingLeft: isSmallScreen ? "0" : "2rem",
          paddingRight: isSmallScreen ? "0" : "2rem",
        }}
      >
        <div className="mint-box">
          <div className="mint-card">
            <img className="mint-card-img" src={metaintelp4} alt="" />
            <div className="min-card-info">
              <p className="mint-card-title">Pentium 4</p>
              <p className="mint-card-content">{t`Description:`} MBTC M-1 series miner</p>
              <p className="mint-card-content">{t`Hashrate:`} 500000</p>
              <p className="mint-card-content">{t`Consumption:`} 10</p>
              <p className="mint-card-token">
                {t`Cost`}
                {`: `}
                {num}
                {` `}
                {t`MinerToken`}
              </p>
              <div className="mint-card-opt">
                <Button className="mint-btn" onClick={mintHandler} disabled={num === 0}>
                  {t`Mint`}
                </Button>
                <div className="mint-input">
                  <Input id="balance" type="number" value={num} onChange={e => handleChangeNum(e)} />
                  <Button
                    className="input-plus"
                    disabled={num === 0}
                    onClick={() => {
                      handleChangeNum(num - 1);
                    }}
                  >
                    -
                  </Button>
                  <Button
                    className="input-plus"
                    onClick={() => {
                      handleChangeNum(num + 1);
                    }}
                    disabled={num === Number(balance)}
                  >
                    +
                  </Button>
                  <div className="input-max-box">
                    <Button
                      className="input-max"
                      onClick={() => {
                        handleChangeNum(balance);
                      }}
                      disabled={Number(balance) === 0}
                    >
                      {t`Max`}
                      {` `}
                    </Button>
                    <span className="max-num">{Number(balance)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
        <Typography variant="h5" style={{ marginLeft: "1rem" }}>
          {t`Communicating with blockchain nodes...`}
        </Typography>
      </Backdrop>
    </div>
  );
};

export default memo(Mint);
