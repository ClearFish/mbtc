import "./styles.scss";
import MetaBitcon from "../../assets/images/meta-bitcoin.png";
import MetaBitconMobile from "../../assets/images/meta-bitcoin-mobile.png";
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
import PartnerUniswap from "../../assets/images/partner-uniswap.png";
import PartnerCoinGecko from "../../assets/images/partner-coingecko.png";
import PartnerLbank from "../../assets/images/partner-lbank.png";
import PartnerBinance from "../../assets/images/partner-binance.png";
import PartnerCoinMarketCap from "../../assets/images/partner-coinmarketcap.png";
import PartnerAlawad from "../../assets/images/partner-alawad.png";
import Partner1inch from "../../assets/images/partner-1inch.png";
import PartnerCertik from "../../assets/images/partner-certik.png";
import PartnerShark from "../../assets/images/partner-shark.png";
import PartnerPancake from "../../assets/images/partner-pancake.png";

import { Container, useMediaQuery, Link, Typography, Button, Grid, Box } from "@material-ui/core";

const transforRoad = (arr: any) => {
  const tempArr = [...arr];
  const tempItem = tempArr[3];
  tempArr[3] = tempArr[5];
  tempArr[5] = tempItem;
  return tempArr;
};

export function Home() {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const paperHandler = () => {
    window.open(window.location.origin + "/whitepaper.pdf");
  };

  const partners = [
    PartnerBitcoin,
    PartnerBitmain,
    PartnerPancake,
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

  const roadMap = [
    {
      name: "Q2 2022",
      list: [
        {
          item: "Launch of Meta Bitcoin",
          done: true,
        },
        {
          item: "MBTC Foundation",
          done: true,
        },
        ,
        {
          item: "MBTC roadshow debut",
          done: true,
        },
      ],
      grid: 4,
    },
    {
      name: "Q3 2022",
      list: [
        {
          item: "MBTC miner M-1 series release",
          done: false,
        },
        {
          item: "Web3 DApp & NFT market launch",
          done: false,
        },
        {
          item: "MBTC genesis block; first MBTC mined",
          done: false,
        },
        {
          item: "Listing on DEX",
          done: false,
        },
        {
          item: "External audits",
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: "Q4 2022",
      list: [
        {
          item: "MBTC pool P-1 series release",
          done: false,
        },
        {
          item: "Mining UX improvement",
          done: false,
        },
        {
          item: "Airdrops platform & app",
          done: false,
        },
        {
          item: "Listing on major exchanges",
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: "Q1 2023",
      list: [
        {
          item: "Development of payment use cases",
          done: false,
        },
        {
          item: "Intense marketing & community push",
          done: false,
        },
        {
          item: "MBTC DeFi launch",
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: "Q2 2023",
      list: [
        {
          item: "Staking & Mining related products",
          done: false,
        },
        {
          item: "Development of FPGA miner",
          done: false,
        },
        {
          item: "Development of ASIC miner",
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: "Q3 2023",
      list: [
        {
          item: "wMBTC token launch",
          done: false,
        },
        {
          item: "MBTC cross chain bridge ",
          done: false,
        },
        {
          item: "Integration with DeFi applications",
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: "Q4 2023",
      list: [
        {
          item: "MBTC mining in 3D metaverse",
          done: false,
        },
        {
          item: "MBTC metaverse ecosystem launch",
          done: false,
        },
        {
          item: "Support MBTC DeFi/GameFi/SocialFi applications",
          done: false,
        },
      ],
      grid: 6,
    },
    {
      name: "H1 2024",
      list: [
        {
          item: "1T market cap",
          done: false,
        },
        {
          item: "MBTC investment fund and trust",
          done: false,
        },
        {
          item: "Expand MBTC metaverse to art, finance, entertainment, and tech",
          done: false,
        },
      ],
      grid: 6,
    },
  ];

  const transforedRoadMap = transforRoad(roadMap);

  return (
    <div className={isSmallScreen ? "isMobile" : ""}>
      <div className="block1">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "6rem" : "13rem",
            position: "relative",
          }}
        >
          <video
            src={window.location.origin + (isSmallScreen ? "/coin-mobile.mp4" : "/coin.mp4")}
            muted
            autoPlay
            loop
            playsInline={true}
            controls={false}
            className="coin-vedio"
          ></video>
          <Container
            style={{
              paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "0",
              paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "0",
            }}
          >
            <div className="block-left">
              <img src={isSmallScreen ? MetaBitconMobile : MetaBitcon} alt="" className="meta-img" />
              <Typography variant="body1" align="left" className="tng-text">
                The Next Generation Crypto Providing a Cross-chain Trust Standard in the Metaverse
              </Typography>
              <div className="social-link">
                <Link href="https://twitter.com/MetaMBTC" target={"_blank"} underline="none">
                  <img src={Twitter} alt="" />
                </Link>
                <Link href="https://t.me/MetaMBTC" target={"_blank"} underline="none">
                  <img src={Telegram} alt="" />
                </Link>
                <Link href="https://github.com/meta-btc" target={"_blank"} underline="none">
                  <img src={Github} alt="" />
                </Link>
                <Link href="https://medium.com/@MetaBitcoin" target={"_blank"} underline="none">
                  <img src={AndSoOn} alt="" />
                </Link>
              </div>
            </div>
          </Container>
        </Container>
        <Typography className="mbtc-txt">MBTC Genesis Block Launch Countdown: One month</Typography>
      </div>
      <div className="block2">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "2rem" : "9rem",
            display: isSmallScreen ? "block" : "flex",
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
              <li>In 2022, Meta Satoshi Nakamoto launched MBTC, a decentralized digital currency in the metaverse.</li>
              <li>
                MBTC mining requires hash power from NFT miners using next-gen proof-of-NFT validation with zero energy
                consumption.
              </li>
              <li>
                The maximum supply of MBTC is 21,000,000. Mining rewards are 50MBTC per 10mins initially and will be
                halved every four years.
              </li>
            </ul>
            <Box sx={{ display: { xs: "block", md: "flex" } }} className="opt-block">
              <Button className="download-btn" onClick={paperHandler}>
                <Typography>Meta White Paper</Typography>
              </Button>
              <div className="opt-list">
                <Link href="" target="_blank" className="opt-audit">
                  <img src={PartnerCertik} />
                </Link>
                <Link
                  href="https://www.sharkteam.org/report/audit/20220331002C.pdf"
                  target="_blank"
                  className="opt-audit"
                >
                  <img src={PartnerShark} />
                </Link>
              </div>
            </Box>
          </div>
        </Container>
      </div>
      <div className="block3">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "0rem" : "4rem",
          }}
        >
          <Grid container spacing={isSmallScreen ? 3 : 8}>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                className="block-card"
                href="#/economy#mbtc"
                underline="none"
                style={{
                  background: `url(${CardMBTC}) no-repeat`,
                  backgroundSize: "100%",
                }}
              >
                <Typography className="card-title">MBTC</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                className="block-card"
                href="#/economy#mfuel"
                underline="none"
                style={{
                  background: `url(${CardMFUEL}) no-repeat`,
                  backgroundSize: "100%",
                }}
              >
                <Typography className="card-title">MFuel</Typography>
              </Link>
            </Grid>
            <Typography variant="h4" align="center" className="block-title explore">
              Explore for more.
            </Typography>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                className="block-card"
                href="#/economy#miner"
                underline="none"
                style={{
                  background: `url(${CardMINER}) no-repeat`,
                  backgroundSize: "100%",
                }}
              >
                <Typography className="card-title">NFT Miner</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                className="block-card"
                href="#/economy#pool"
                underline="none"
                style={{
                  background: `url(${CardPOOL}) no-repeat`,
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
          <Grid container={true} alignItems="center" spacing={isSmallScreen ? 2 : 3}>
            {partners.map((item, index) => (
              <Grid item xs={4} sm={4} md={3} key={index}>
                <div className="block-partner">
                  <img className="partner-logo" src={item}></img>
                </div>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4" align="center" className="block-title">
            Roadmap
          </Typography>
          <Grid container className={isSmallScreen ? "transfored" : "roadmap"}>
            {(isSmallScreen ? roadMap : transforedRoadMap).map(item => {
              return (
                <Grid item xs={isSmallScreen ? 12 : item.grid}>
                  <div className="block-todo">
                    <Typography variant="h4" className="todo-title">
                      {item.name}
                    </Typography>
                    <ul>
                      {item.list.map((childItem: any) => (
                        <li className={childItem.done ? "done" : ""}>{childItem.item}</li>
                      ))}
                    </ul>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
