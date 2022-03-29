import "./styles.scss";

import Person1 from "../../assets/images/person1.png";
import Person5 from "../../assets/images/person5.png";

import MetaBitcoin from "../../assets/images/meta-bitcoin.png";
import FoundationTxt from "../../assets/images/foundation.png";
import GoldenBitcoin from "../../assets/images/golden-bitcoin.png";

import { Container, useMediaQuery, Typography, Card, CardMedia, CardContent, Grid } from "@material-ui/core";

export function Foundation() {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const personList = [
    {
      name: "Doctor Lord",
      info: "Head of Philosophy",
      src: Person1,
    },
    {
      name: "Jojo Jiang",
      info: "Chairwoman of Public Relations",
      src: "",
    },
    {
      name: "Sam Lee",
      info: "Head of Public Media",
      src: "",
    },
    {
      name: "Adrian Aurelius",
      info: "Head of Marketing",
      src: Person5,
    },
  ];

  return (
    <div className={isSmallScreen ? "isMobile" : ""}>
      <div className="block5">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "1rem" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "6rem" : "10rem",
            paddingBottom: "8rem",
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
            3. A roadmap and governance for the future of Meta Bitcoin.
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
          <Grid container spacing={isSmallScreen ? 2 : 8} className="board-list">
            {personList.map((item, index) => (
              <Grid item xs={isSmallScreen ? 6 : 3} className="list-item">
                <Card className="board-card" key={index}>
                  <CardMedia component="img" image={item.src} className={item.src ? "" : "occupy-img"} />
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
