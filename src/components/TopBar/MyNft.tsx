import { Button, Typography, Link } from "@material-ui/core";
function MyNft() {
  return (
    <Link href="#/mynft" underline="none">
      <Button id="ohm-menu-button" variant="contained" color="secondary">
        <Typography>My NFT: 4</Typography>
      </Button>
    </Link>
  );
}

export default MyNft;
