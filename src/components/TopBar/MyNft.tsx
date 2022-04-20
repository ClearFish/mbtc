import { Button, Typography, Link } from "@material-ui/core";
import "./TopBar.scss";

function MyNft() {
  return (
    <Link href="#/mynft" underline="none" className="topbar-link-btn">
      <Button id="ohm-menu-button" variant="contained" color="secondary">
        <Typography>My NFT: 4</Typography>
      </Button>
    </Link>
  );
}

export default MyNft;
