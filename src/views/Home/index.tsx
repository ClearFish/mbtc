import "./styles.scss";
import MetaBitcon from "../../assets/images/meta-bitcoin.png";
import Twitter from "../../assets/icons/twitter.svg";
import Telegram from "../../assets/icons/telegram.svg";
import Github from "../../assets/icons/github.svg";
import AndSoOn from "../../assets/icons/medium.svg";
import HugeDiamond from "../../assets/images/huge-diamond.png";
import CardMBTC from "../../assets/images/card-mbtc.png";
import CardMFUEL from "../../assets/images/card-mfuel.png";
import CardMINER from "../../assets/images/card-miner.png";
import CardPOOL from "../../assets/images/card-pool.png";

import PartnerBitcoin from "../../assets/images/partner-bitcoin.png";
import PartnerBitmain from "../../assets/images/partner-bitmain.png";
import PartnerPolygon from "../../assets/images/partner-polygon.png";
import PartnerUniswap from "../../assets/images/partner-uniswap.png";
import PartnerCoinGecko from "../../assets/images/partner-coingecko.png";
import PartnerLbank from "../../assets/images/partner-lbank.png";
import PartnerBinance from "../../assets/images/partner-binance.png";
import PartnerCoinMarketCap from "../../assets/images/partner-coinmarketcap.png";
import PartnerAlawad from "../../assets/images/partner-alawad.png";
import Partner1inch from "../../assets/images/partner-1inch.png";
import PartnerCertik from "../../assets/images/partner-certik.png";
import PartnerShark from "../../assets/images/partner-shark.png";

import { Container, useMediaQuery, Link, Typography, Button, Grid } from "@material-ui/core";

export function Home() {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const paperHandler = () => {
    window.open(window.location.origin + "/whitepaper.pdf");
  };

  const partners = [
    PartnerBitcoin,
    PartnerBitmain,
    PartnerPolygon,
    PartnerUniswap,
    PartnerCoinGecko,
    PartnerLbank,
    PartnerBinance,
    PartnerCoinMarketCap,
    PartnerAlawad,
    Partner1inch,
    PartnerCertik,
    PartnerShark,
  ];

  return (
    <div>
      <div className="block1">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "8rem" : "13rem",
            position: "relative",
          }}
        >
          <video src={window.location.origin + "/coin.mp4"} muted autoPlay loop className="coin-vedio"></video>
          <div className="block-left">
            <img src={MetaBitcon} alt="" className="meta-img" />
            <Typography variant="body1" align="left" className="tng-text">
              The Next Generation Crypto Providing a Cross-chain Trust Standard in the Metaverse
            </Typography>
            <div className="social-link">
              <Link href="#/home" underline="none">
                <img src={Twitter} alt="" />
              </Link>
              <Link href="#/home" underline="none">
                <img src={Telegram} alt="" />
              </Link>
              <Link href="#/home" underline="none">
                <img src={Github} alt="" />
              </Link>
              <Link href="#/home" underline="none">
                <img src={AndSoOn} alt="" />
              </Link>
            </div>
          </div>
        </Container>
        <Typography className="mbtc-txt">MBTC Genesis Block Launch Countdown: One month</Typography>
      </div>
      <div className="block2">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "6rem" : "9rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="block-left">
            <img src={HugeDiamond} alt="" className="diamond-img" />
          </div>
          <div className="block-right">
            <Typography variant="body1" align="left" className="wimb-text">
              What is <br />
              Meta Bitcoin?
            </Typography>
            <ul className="bitcoin-list">
              <li>In 2022, Meta Satishi Nakamoto launched MBTC, a decentralized digital currency in the metaverse.</li>
              <li>
                MBTC mining requires hash power from NFT miners using next-gen proof-of-NFT validation with zero energy
                consumption.
              </li>
              <li>
                The maximum supply of MBTC is 21,000,000. Mining rewards are 50MBTC per 10mins initially and will be
                halved every four years.
              </li>
            </ul>
            <Button className="download-btn" onClick={paperHandler}>
              <Typography>Meta White Paper</Typography>
            </Button>
          </div>
        </Container>
      </div>
      <div className="block3">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "2rem" : "4rem",
          }}
        >
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Link
                className="block-card"
                href="#/economy#mbtc"
                underline="none"
                style={{
                  background: `url(${CardMBTC})`,
                  backgroundSize: "100%",
                }}
              >
                <Typography className="card-title">MBTC</Typography>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                className="block-card"
                href="#/economy#mfuel"
                underline="none"
                style={{
                  background: `url(${CardMFUEL})`,
                  backgroundSize: "100%",
                }}
              >
                <Typography className="card-title">MFuel</Typography>
              </Link>
            </Grid>
          </Grid>
          <Typography variant="h4" align="center" className="block-title">
            Explore for more.
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Link
                className="block-card"
                href="#/economy#miner"
                underline="none"
                style={{
                  background: `url(${CardMINER})`,
                  backgroundSize: "100%",
                }}
              >
                <Typography className="card-title">NFT Miner</Typography>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                className="block-card"
                href="#/economy#pool"
                underline="none"
                style={{
                  background: `url(${CardPOOL})`,
                  backgroundSize: "100%",
                }}
              >
                <Typography className="card-title">MFT Pool</Typography>
              </Link>
            </Grid>
          </Grid>
          <Typography variant="h4" align="center" className="block-title">
            Partners
          </Typography>
          <Grid container={true} alignItems="center" spacing={3}>
            {partners.map((item, index) => (
              <Grid item xs={3} key={index}>
                <div className="block-partner">
                  <img className="partner-logo" src={item}></img>
                </div>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4" align="center" className="block-title">
            Roadmap
          </Typography>
          <Grid container className="roadmap">
            <Grid item xs={4}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  Q2 2022
                </Typography>
                <ul>
                  <li className="done">Launch of Meta Bitcoin</li>
                  <li className="done">MBTC Foundation</li>
                  <li>MBTC roadshow debut</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  Q3 2022
                </Typography>
                <ul>
                  <li>MBTC miner M-1 series release</li>
                  <li>Web3 DApp & NFT market launch </li>
                  <li>MBTC genesis block; first MBTC mined</li>
                  <li>Listing on DEX</li>
                  <li>External audits</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  Q4 2022
                </Typography>
                <ul>
                  <li>MBTC pool P-1 series release</li>
                  <li>Mining UX improvement</li>
                  <li>Airdrops platform & app</li>
                  <li>Listing on major exchanges</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  Q3 2023
                </Typography>
                <ul>
                  <li>wMBTC token launch</li>
                  <li>MBTC cross chain bridge </li>
                  <li>Integration with DeFi applications</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  Q2 2023
                </Typography>
                <ul>
                  <li>Staking & Mining related products</li>
                  <li>Development of FPGA miner</li>
                  <li>Development of ASIC miner</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  Q1 2023
                </Typography>
                <ul>
                  <li>Development of payment use cases</li>
                  <li>Intense marketing & community push </li>
                  <li>MBTC DeFi launch</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  Q4 2023
                </Typography>
                <ul>
                  <li>MBTC mining in 3D metaverse</li>
                  <li>MBTC metaverse ecosystem launch </li>
                  <li>Support MBTC DeFi/GameFi/SocialFi applications</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="block-todo">
                <Typography variant="h4" className="todo-title">
                  H1 2024
                </Typography>
                <ul>
                  <li>1T market cap</li>
                  <li>MBTC investment fund and trust</li>
                  <li>Expand MBTC metaverse to art, finance, entertainment, and tech</li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
