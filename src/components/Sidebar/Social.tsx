import { Link, SvgIcon } from "@material-ui/core";
import { ReactComponent as Telegram } from "../../assets/icons/telegram.svg";
import { ReactComponent as Github } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";

import React from "react";

const Social: React.FC = () => (
  <div className="social-row">
    <Link href="https://github.com/meta-btc" target="_blank">
      <SvgIcon component={Github} />
    </Link>
    <Link href="https://t.me/MBTC_Official_Channel" target="_blank">
      <SvgIcon component={Telegram} />
    </Link>
    <Link href="https://twitter.com/MetaMBTC" target="_blank">
      <SvgIcon component={Twitter} />
    </Link>
    <Link href="https://medium.com/@MetaBitcoin" target="_blank">
      <SvgIcon component={Medium} />
    </Link>
  </div>
);

export default Social;
