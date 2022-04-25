import { useQuery } from "react-query";
import { NFTMiner_ADDRESS } from "src/contract";
import { useWeb3Context } from "./web3Context";

export const useNftBalance = () => {
  const { address } = useWeb3Context();
  const requestUrl = "https://admin.meta-backend.org/system/open/api/nft/owner/detail";
  const { data } = useQuery(`${address}-${requestUrl}`, async () => {
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

  return [data];
};
