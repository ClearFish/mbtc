import { Link } from "@material-ui/core";
import { useEffect, useState } from "react";
import { NFTMiner_ADDRESS } from "src/contract";
import { useWeb3Context } from "src/hooks";
import "./TopBar.scss";

function MyNft() {
  const { address, provider, networkId, connected } = useWeb3Context();
  const [num, setNum] = useState<number>(0);

  /** 获取nft数量 **/
  const getNftNum = async () => {
    try {
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/owner/detail";
      const {
        data: { tokenIds },
      } = await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            contract: NFTMiner_ADDRESS,
            address: address,
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      setNum(tokenIds.length);
    } catch (err) {
      console.log({ err });
    }
  };

  setInterval(() => {
    getNftNum();
  }, 5000);

  useEffect(() => {
    if (provider && address && networkId === 97) {
      getNftNum();
    }
  }, [networkId, connected, address]);

  return (
    <Link href="#/mynft" underline="none" className="topbar-link-btn">
      <div className="my-ntf">My NFT: {num}</div>
    </Link>
  );
}

export default MyNft;
