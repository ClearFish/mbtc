/* eslint-disable */
import "./Sidebar.scss";

import { t, Trans } from "@lingui/macro";
import { Box, Divider, Link, Paper, SvgIcon } from "@material-ui/core";
import { NavItem } from "@olympusdao/component-library";
import React from "react";
import { NetworkId } from "src/constants";
import { useWeb3Context } from "src/hooks/web3Context";
import { Bond } from "src/lib/Bond";
import { IBondDetails } from "src/slices/BondSlice";

import { ReactComponent as MBTCIcon } from "../../assets/icons/mbtc-logo.svg";
import WalletAddressEns from "../TopBar/Wallet/WalletAddressEns";
import Social from "./Social";

type NavContentProps = {
  handleDrawerToggle?: () => void;
};

const NavContent: React.FC<NavContentProps> = ({ handleDrawerToggle }) => {
  const { networkId, address, provider } = useWeb3Context();
  console.log("networkId", networkId);

  // if(!(networkId === NetworkId.BSC || networkId === NetworkId.BSC_TESTNET)) {
  //   history.push("/wrap");
  // }

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href={"/#/home"} target="_blank" style={{ marginBottom: "1rem" }}>
              <SvgIcon
                color="primary"
                component={MBTCIcon}
                viewBox="0 0 63 46"
                style={{ minWidth: "63px", minHeight: "46px", width: "63px" }}
              />
            </Link>
            <WalletAddressEns />
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              {networkId === NetworkId.BSC || networkId === NetworkId.BSC_TESTNET ? (
                <>
                  <NavItem to="/dashboard" icon={"dashboard"} label={t`Dashboard`} />
                  <NavItem to="/mine" icon={"zap"} label={t`Mine`} />
                  <NavItem to="/pool" icon={"bond"} label={t`Pool`} />
                  <NavItem to="/stake" icon="stake" label={t`Stake`} />
                  <NavItem to="/nftmarket" icon="grants" label={t`NFT Market`} />
                  <NavItem to="/blindbox" icon="moon" label={t`Blind Box`} />
                  <Box className="menu-divider">
                    <Divider />
                  </Box>
                </>
              ) : (
                <>
                  <NavItem to="/wrap" icon="wrap" label={t`Wrap`} />
                </>
              )}
              {}
            </div>
          </div>
        </div>
        <Box className="dapp-menu-social" display="flex" justifyContent="space-between" flexDirection="column">
          <Social />
        </Box>
      </Box>
    </Paper>
  );
};

export default NavContent;
