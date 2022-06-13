import { useQuery } from "react-query";
import { NFTMiner_ADDRESS } from "src/contract";
import { useWeb3Context } from "./web3Context";
import { useHistory } from "react-router-dom";

export const useNftBalance = () => {
  const { address, networkId } = useWeb3Context();
  const history = useHistory();
  const KEY = history?.location?.key || "";
  const requestUrl = "https://admin.meta-backend.org/system/open/api/nft/owner/detail";
  const { data } = useQuery(`${KEY}-${address}`, async () => {
    try {
      const response = await fetch(requestUrl, {
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
      if (!response) throw new Error("No response from MBTC");
      return response.data.total || 0;
    } catch (err) {
      console.log(err);
    }
    return 0;
  });
  if (networkId === 56) {
    return [data];
  } else {
    return [0];
  }
};
