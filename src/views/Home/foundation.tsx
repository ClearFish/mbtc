import "./styles.scss";

import Person1 from "../../assets/images/person1.png";
import Person2 from "../../assets/images/person2.png";
import Person3 from "../../assets/images/person3.png";
import Person4 from "../../assets/images/person4.png";
import Person5 from "../../assets/images/person5.png";
import Person6 from "../../assets/images/person6.png";
import Person7 from "../../assets/images/person7.png";

import { Container, useMediaQuery, Typography, Card, CardMedia, CardContent } from "@material-ui/core";

export function Foundation() {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  return (
    <>
      <div className="block5">
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3rem",
            paddingTop: isSmallScreen || isVerySmallScreen ? "6rem" : "10rem",
            paddingBottom: "8rem",
          }}
          className="foundation-bg"
        >
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
            ABOUT THE FOUNDATION
          </Typography>
          <Typography variant="body1" align="left" className="normal-text">
            By providing the next generation decentralized financial system in the metaverse,
            <br />
            Our vision is to make humanity inter-dimensional
          </Typography>
          <Typography variant="h4" align="left" className="gradient-text">
            BOARD
          </Typography>
          <div className="board-list">
            <Card className="board-card">
              <CardMedia component="img" image={Person1} />
              <CardContent>
                <Typography variant="h6" component="div">
                  Doctor Lord
                </Typography>
                <Typography variant="body2">Co-founder of MBTC Foundation, Head of Concept</Typography>
              </CardContent>
            </Card>
            <Card className="board-card">
              <CardMedia component="img" image={Person2} />
              <CardContent>
                <Typography variant="h6" component="div">
                  Sam Lee
                </Typography>
                <Typography variant="body2">Co-founder of MBTC Foundation, Head of Media</Typography>
              </CardContent>
            </Card>
            <Card className="board-card">
              <CardMedia component="img" image={Person3} />
              <CardContent>
                <Typography variant="h6" component="div">
                  Jojo Jiang
                </Typography>
                <Typography variant="body2">Chairwoman of Public Relationship</Typography>
              </CardContent>
            </Card>
            <Card className="board-card">
              <CardMedia component="img" image={Person4} />
              <CardContent>
                <Typography variant="h6" component="div">
                  Jeff Z
                </Typography>
                <Typography variant="body2">President of Legal & Governance</Typography>
              </CardContent>
            </Card>
            <Card className="board-card">
              <CardMedia component="img" image={Person5} />
              <CardContent>
                <Typography variant="h6" component="div">
                  Adrian Aurelius
                </Typography>
                <Typography variant="body2">President of Marketing</Typography>
              </CardContent>
            </Card>
            <Card className="board-card">
              <CardMedia component="img" image={Person6} />
              <CardContent>
                <Typography variant="h6" component="div">
                  Saeed Alalii
                </Typography>
                <Typography variant="body2">VP of Marketing</Typography>
              </CardContent>
            </Card>
            <Card className="board-card">
              <CardMedia component="img" image={Person7} />
              <CardContent>
                <Typography variant="h6" component="div">
                  Andy Z
                </Typography>
                <Typography variant="body2">Head of Community</Typography>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}
