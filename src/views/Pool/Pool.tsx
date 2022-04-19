import "./Pool.scss";
import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks/web3Context";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";

const Pool: React.FC = () => {
  const history = useHistory();
  // const { address, connect, provider, connected, networkId, providerInitialized } = useWeb3Context();
  // usePathForNetwork({ pathName: "mine", networkID: networkId, history });
  const { networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "pool", networkID: networkId, history });

  return <div>pool</div>;
};

export default memo(Pool);
