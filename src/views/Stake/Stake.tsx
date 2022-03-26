import "./Stake.scss";

import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { PrimaryButton } from "@olympusdao/component-library";
import { Trans } from "@lingui/macro";

// import ExternalStakePools from "./components/ExternalStakePools/ExternalStakePools";
// import { StakeArea } from "./components/StakeArea/StakeArea";

const Stake: React.FC = () => {
  const history = useHistory();
  const { networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "stake", networkID: networkId, history });

  return (
    <div id="stake-view">
      <PrimaryButton size="large" className="primary-btn">
        <Trans>Stake MBTC earn MFuel APY</Trans>
      </PrimaryButton>
      <PrimaryButton size="large" className="primary-btn">
        <Trans>Stake MFuel earn MFuel APY</Trans>
      </PrimaryButton>
      <PrimaryButton size="large" className="primary-btn">
        <Trans>Stake MFTC earn NFT vault</Trans>
      </PrimaryButton>

      {/* <StakeArea /> */}

      {/* NOTE (appleseed-olyzaps) olyzaps disabled until v2 contracts */}
      {/* <ZapCta /> */}

      {/* <ExternalStakePools /> */}
    </div>
  );
};

export default memo(Stake);
