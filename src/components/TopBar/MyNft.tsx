import { Link } from "@material-ui/core";
import { useNftBalance } from "src/hooks/useNftBalance";
import "./TopBar.scss";

function MyNft() {
  const [nftBlance] = useNftBalance();
  return (
    <Link href="#/mynft" underline="none" className="topbar-link-btn">
      <div className="my-ntf">My NFT: {nftBlance}</div>
    </Link>
  );
}

export default MyNft;
