import "./styles.scss";
import { Trans, t } from "@lingui/macro";
// import MetaBitcon from "../../assets/images/meta-bitcoin.png";
// import MetaBitconMobile from "../../assets/images/meta-bitcoin-mobile.png";

// import HugeDiamond from "../../assets/images/huge-diamond.png";
import HugeDiamondGif from "../../assets/images/b_coins.gif";
// import CardMBTC from "../../assets/images/card-mbtc.png";
// import CardMFUEL from "../../assets/images/card-mfuel.png";
// import CardMINER from "../../assets/images/card-miner.png";
// import CardPOOL from "../../assets/images/card-pool.png";
import BtcZ from "../../assets/images/coinn.png";
import Fuel from "../../assets/images/fuel.png";
import NftMiner from "../../assets/images/miner1.png";
import NftPool from "../../assets/images/Daco.png";
import ExplorBg from "../../assets/images/Rectangle.png";

import PartnerBitcoin from "../../assets/images/bitmain-logo.png";
import PartnerBitmain from "../../assets/images/new-binance-chain-logo.png";
import PartnerUniswap from "../../assets/images/pancakeswaplogo-freelogovectors.png";
import PartnerCoinGecko from "../../assets/images/bitcoin-logo-png.png";
import PartnerLbank from "../../assets/images/lbank-logo-freelogovectors.png";
import PartnerBinance from "../../assets/images/Binance-Logo.png";
import PartnerCoinMarketCap from "../../assets/images/CMC-02.png";
import PartnerAlawad from "../../assets/images/coingecko-logo-white.png";
import Partner1inch from "../../assets/images/linch_logo.png";
import PartnerCertik from "../../assets/images/certik.png";
import PartnerShark from "../../assets/images/sharkteam.png";
// import PartnerPancake from "../../assets/images/partner-pancake.png";

import Social from "../../components/Sidebar/Social";

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
    "",
    PartnerBitcoin,
    PartnerBitmain,
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
      name: t`Q2 2022`,
      list: [
        {
          item: t`Launch of Meta Bitcoin`,
          done: true,
        },
        {
          item: t`MBTC Foundation`,
          done: true,
        },
        {
          item: t`MBTC roadshow debut`,
          done: true,
        },
      ],
      grid: 4,
    },
    {
      name: t`Q3 2022`,
      list: [
        {
          item: t`MBTC miner M-1 series release`,
          done: true,
        },
        {
          item: t`Web3 DApp & NFT market launch`,
          done: true,
        },
        {
          item: t`MBTC genesis block; first MBTC mined`,
          done: true,
        },
        {
          item: t`Listing on DEX`,
          done: true,
        },
        {
          item: t`External audits`,
          done: true,
        },
      ],
      grid: 4,
    },
    {
      name: t`Q4 2022`,
      list: [
        {
          item: t`Metabitcointalk.com the world's first Web3 forum for MBTC`,
          done: false,
        },
        {
          item: t`MBTC pool P-1 series release`,
          done: false,
        },
        {
          item: t`Mining UX improvement`,
          done: false,
        },
        {
          item: t`Airdrops platform & app`,
          done: false,
        },
        {
          item: t`Listing on major exchanges`,
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: t`Q1 2023`,
      list: [
        {
          item: t`Development of payment use cases`,
          done: false,
        },
        {
          item: t`Intense marketing & community push`,
          done: false,
        },
        {
          item: t`MBTC DeFi launch`,
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: t`Q2 2023`,
      list: [
        {
          item: t`Staking & Mining related products`,
          done: false,
        },
        {
          item: t`Development of FPGA miner`,
          done: false,
        },
        {
          item: t`Development of ASIC miner`,
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: t`Q3 2023`,
      list: [
        {
          item: t`wMBTC token launch`,
          done: false,
        },
        {
          item: t`MBTC cross chain bridge `,
          done: false,
        },
        {
          item: t`Integration with DeFi applications`,
          done: false,
        },
      ],
      grid: 4,
    },
    {
      name: t`Q4 2023`,
      list: [
        {
          item: t`MBTC mining in 3D metaverse`,
          done: false,
        },
        {
          item: t`MBTC metaverse ecosystem launch`,
          done: false,
        },
        {
          item: t`Support MBTC DeFi/GameFi/SocialFi applications`,
          done: false,
        },
      ],
      grid: 6,
    },
    {
      name: t`H1 2024`,
      list: [
        {
          item: t`1T market cap`,
          done: false,
        },
        {
          item: t`MBTC investment fund and trust`,
          done: false,
        },
        {
          item: t`Expand MBTC metaverse to art, finance, entertainment, and tech`,
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
          {/* <video
            src={window.location.origin + (isSmallScreen ? "/coin-mobile.mp4" : "/coin.mp4")}
            muted
            autoPlay
            loop
            playsInline={true}
            controls={false}
            className="coin-vedio"
          ></video> */}
          <Container
            style={{
              paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "0",
              paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "0",
            }}
          >
            {/* <div className="block-left">
              <img src={isSmallScreen ? MetaBitconMobile : MetaBitcon} alt="" className="meta-img" />
              <Typography variant="body1" align="left" className="tng-text">
                <Trans>The Next Generation Crypto Providing a Cross-chain Trust Standard in the Metaverse</Trans>
              </Typography>
              <Box className="social-link" display="flex" justifyContent="flex-start" flexDirection="column">
                <Social />
              </Box>
            </div> */}
          </Container>
        </Container>
        <Typography className="mbtc-txt">
          <Trans>The Next Generation Crypto Providing a Cross-chain Trust Standard in the Metaverse</Trans>
        </Typography>
        <Box className="social-link top_socia_link" display="flex" justifyContent="flex-start" flexDirection="column">
          <Social />
        </Box>
      </div>
      <div className="block2">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "2rem" : "6rem",
            display: isSmallScreen ? "block" : "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="block-left">
            <img src={HugeDiamondGif} alt="" className="diamond-img" />
          </div>
          <div className="block-right">
            <Typography variant="body1" align="left" className="wimb-text">
              {t`What is`} <br />
              {t`Meta Bitcoin?`}
            </Typography>
            <ul className="bitcoin-list">
              <li>{t`In 2022, Meta Satoshi Nakamoto launched MBTC, a decentralized digital currency in the metaverse.`}</li>
              <li>
                {t`MBTC mining requires hash power from NFT miners using next-gen proof-of-NFT validation with zero energy consumption.`}
              </li>
              <li>
                {t`The maximum supply of MBTC is 21,000,000. Mining rewards are 50MBTC per 10mins initially and will be halved every four years.`}
              </li>
            </ul>
            <Box sx={{ display: { xs: "block", md: "flex" } }} className="opt-block">
              <Button className="download-btn" onClick={paperHandler}>
                <Typography>{t`Meta White Paper`}</Typography>
              </Button>
              {/* <div className="opt-list">
                <Link href="https://www.certik.com/projects/meta-bitcoin" target="_blank" className="opt-audit">
                  <img src={PartnerCertik} />
                </Link>
                <Link
                  href="https://www.sharkteam.org/report/audit/20220331002C_en.pdf"
                  target="_blank"
                  className="opt-audit"
                >
                  <img src={PartnerShark} />
                </Link>
              </div> */}
            </Box>
          </div>
        </Container>
        <div className="bottom_bg"></div>
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
                className="block-card block-card-first-line"
                href="#/economy#mbtc"
                underline="none"
                style={{
                  background: `url(${ExplorBg}) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <img src={BtcZ} alt="" className="btcz-img" />
                <Typography className="card-title">{t`BTCZ`}</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                className="block-card block-card-first-line"
                href="#/economy#mfuel"
                underline="none"
                style={{
                  background: `url(${ExplorBg}) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <img src={Fuel} alt="" className="Fuel-img" />
                <Typography className="card-title">{t`MFuel`}</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                className="block-card"
                href="#/economy#miner"
                underline="none"
                style={{
                  background: `url(${ExplorBg}) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <img src={NftMiner} alt="" className="NftMiner-img" />
                <Typography className="card-title">{t`NFT Miner`}</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                className="block-card"
                href="#/economy#pool"
                underline="none"
                style={{
                  background: `url(${ExplorBg}) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <img src={NftPool} alt="" className="NftMiner-img" />
                <Typography className="card-title">{t`NFT Pool`}</Typography>
              </Link>
            </Grid>
            <div className="explore_box">
              <Typography variant="h4" align="center" className="block-title explore">
                {t`Explore for more.`}
              </Typography>
            </div>
            <div className="bottom_bg"></div>
          </Grid>
        </Container>
      </div>
      <div className="block3 other_box">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "0rem" : "4rem",
          }}
        >
          <div className="partner_box">
            <Typography variant="h4" align="center" className="block-title">
              {t`Partners`}
            </Typography>
            <Grid container={true} alignItems="center" spacing={isSmallScreen ? 2 : 3}>
              {partners.map((item, index) => (
                <Grid item xs={4} sm={4} md={3} key={index}>
                  <div className="block-partner">
                    {item ? <img className="partner-logo" src={item}></img> : <div className="empty"></div>}
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "0rem" : "4rem",
          }}
        >
          <Typography variant="h4" align="center" className="block-title new_block_title">
            {t`Roadmap`}
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
