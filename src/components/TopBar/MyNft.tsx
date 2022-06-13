import { Button, Link } from "@material-ui/core";
import { useNftBalance } from "src/hooks/useNftBalance";
import "./TopBar.scss";
import { t } from "@lingui/macro";
function MyNft() {
  const [nftBlance] = useNftBalance();
  return (
    <Link href="#/mynft" underline="none" className="topbar-link-btn">
      <Button className="my-ntf">
        {t`My Bag:`} <span className="my-nft-num">{nftBlance}</span>
      </Button>
    </Link>
  );
}

export default MyNft;
