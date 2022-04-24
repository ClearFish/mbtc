import "./Pool.scss";
import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks/web3Context";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useMBTCConstant } from "src/hooks/useProtocolMetrics";

const Pool: React.FC = () => {
  const history = useHistory();
  // const { address, connect, provider, connected, networkId, providerInitialized } = useWeb3Context();
  // usePathForNetwork({ pathName: "mine", networkID: networkId, history });
  const { networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "pool", networkID: networkId, history });
  const { data } = useMBTCConstant();

  return (
    <div id="pool-view">
      <div className="title">Pool</div>
      <div className="banner">
        <div className="btc-logo"></div>
        <div className="btc-number">{data.cicrulatingSupply}</div>
        <div className="dubai">DUBAI</div>
        <div className="pool">Pool</div>
        <div className="h5-bottom">DUBAI Pool</div>
      </div>
    </div>
  );
};

export default memo(Pool);
