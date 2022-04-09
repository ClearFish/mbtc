import "./styles.scss";

// import Lord from "../../assets/images/person/Lord.jpg";
// import Jojo from "../../assets/images/person/Jojo.jpg";
// import Sam from "../../assets/images/person/Sam.jpg";
import Adrian from "../../assets/images/person/Adrian.jpg";
import Malik from "../../assets/images/person/Malik.jpg";
import Haider from "../../assets/images/person/Haider.jpeg";
import Andy from "../../assets/images/person/Andy.png";
import Alekwe from "../../assets/images/person/Alekwe.jpg";

import JZ from "../../assets/images/person/JZ.jpg";
import Kitty from "../../assets/images/person/Kitty.png";
import SherryD from "../../assets/images/person/sherryD.jpeg";
import Karn from "../../assets/images/person/Karn.jpg";
import HannaBerji from "../../assets/images/person/HannaBerji.jpg";
import Kim from "../../assets/images/person/Kim.jpg";

import MetaBitcoin from "../../assets/images/meta-bitcoin.png";
import FoundationTxt from "../../assets/images/foundation.png";
import GoldenBitcoin from "../../assets/images/golden-bitcoin.png";

import { Container, useMediaQuery, Typography, Card, CardMedia, CardContent, Grid, Box } from "@material-ui/core";

export function Foundation() {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");

  const personList = [
    // {
    //   name: "Doctor Lord",
    //   info: "Community Veteran, Philosopher & Reality Shaper",
    //   src: Lord,
    // },
    // {
    //   name: "JOJO",
    //   info: "Community Veteran, Public Relations",
    //   src: Jojo,
    // },
    // {
    //   name: "Sam",
    //   info: "Community Veteran, Legal & Public Media",
    //   src: Sam,
    // },
    {
      name: "Adrian Aurelius",
      info: "Marketing Partner",
      src: Adrian,
    },
    {
      name: "Malik Atif",
      info: "Growth Partner",
      src: Malik,
    },
    {
      name: "Syed Haider",
      info: "Growth Partner",
      src: Haider,
    },
    {
      name: "Andy Z",
      info: "Reality Reinforcer",
      src: Andy,
    },
    {
      name: "Alekwe Kingsley",
      info: "Marketing and business analyst",
      src: Alekwe,
    },
    {
      name: "JZ",
      info: "Meta Agent & Philosopher",
      src: JZ,
    },
    {
      name: "Kitty",
      info: "The director",
      src: Kitty,
    },
    {
      name: "Sherry D",
      info: "TheCuteDictator",
      src: SherryD,
    },
    {
      name: "Karn Dwi",
      info: "TheLibertyWalk",
      src: Karn,
    },
    {
      name: "Hanna Berji",
      info: "Peacemaker",
      src: HannaBerji,
    },
    {
      name: "Hankook Kim",
      info: "Community Veteran, Public K Media & marketing",
      src: Kim,
    },
  ];

  return (
    <div className={isSmallScreen ? "isMobile" : ""}>
      <div className="block5">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "5rem" : "10rem",
            paddingBottom: isSmallScreen || isVerySmallScreen ? "4rem" : "8rem",
          }}
          className={isSmallScreen ? "" : "foundation-bg"}
        >
          <img src={MetaBitcoin} className="meta-img"></img>
          <img src={FoundationTxt} className="foundation-img"></img>
          <img src={GoldenBitcoin} className="golden-img"></img>
          <Typography variant="h4" align="left" className="gradient-text">
            ABOUT THE FOUNDATION
          </Typography>
          <Typography variant="body1" align="left" className="normal-text">
            The MBTC Foundation is a TDAO established to provide:
            <br />
            1. Support for the Meta Bitcoin through ecosystem development and community advocacy.
            <br />
            2. One MBTC/NFT one vote to decide the development and releasing of NFTs.
            <br />
            3. Creating a full and comprehensive roadmap which will guide the future of Meta Bitcoin.
          </Typography>
          <Typography variant="h4" align="left" className="gradient-text">
            Vision
          </Typography>
          <Typography variant="body1" align="left" className="normal-text">
            By providing the next generation decentralized financial system,
            <br />
            our vision is to build the Meta Bitcoin standard in the metaverse.
          </Typography>
          <Typography variant="h4" align="left" className="gradient-text">
            BOARD
          </Typography>
          <Grid container className="board-list" justifyContent="flex-start" alignItems="stretch" spacing={1}>
            {personList.map((item, index) => (
              <Grid item className={`list-item ${isLargeScreen && "lg-card"}`} xs={6} sm={3} md={2} lg={1}>
                <Card className="board-card" key={index}>
                  <Box className="board-img-box">
                    <CardMedia
                      style={{
                        height: item.src.indexOf("Jojo") >= 0 && (isSmallScreen || isVerySmallScreen) ? "auto" : "100%",
                      }}
                      component="img"
                      image={item.src}
                      className={item.src ? "" : "occupy-img"}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2">{item.info}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
