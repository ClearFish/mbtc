import "./style.scss";
import { memo, useState, useEffect, useCallback } from "react";
import { useMediaQuery, Box, Select, MenuItem, Typography, CircularProgress } from "@material-ui/core";
import { useWeb3Context } from "src/hooks";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useHistory } from "react-router-dom";
import { NFTMiner_ADDRESS } from "src/contract";
import { useDispatch } from "react-redux";
import { error } from "../../slices/MessagesSlice";
import metaintelp4 from "./assets/metaintelp4.png";
import { t } from "@lingui/macro";
interface NftType {
  name?: string;
  url: string;
  earned?: string;
  hashRate?: string;
  cost?: string;
  attributes?: [];
  tokenId: string;
}

const Market: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const dispatch = useDispatch();
  const [firstLoading, setFirstLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [unStakedList, setUnStakedList] = useState<NftType[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(60);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState("tokenId");
  const [orderList, setOrderList] = useState([
    {
      value: "tokenId",
      text: t`TokenId`,
      asc: true,
    },
  ]);

  const history = useHistory();
  const { networkId, address, provider, connected } = useWeb3Context();
  usePathForNetwork({ pathName: "mynft", networkID: networkId, history });

  /** 获取未质押nft **/
  const getUnStakedList = async () => {
    try {
      if (!address) {
        return;
      }
      if (pageNum === 1) {
        setFirstLoading(true);
      } else {
        setListLoading(true);
      }
      const centralApi = "https://admin.meta-backend.org/system/open/api/nft/owner/detail";
      const {
        data: { list, total },
      } = await fetch(centralApi, {
        method: "post",
        body: JSON.stringify({
          sign: "",
          data: {
            contract: NFTMiner_ADDRESS,
            address: address,
            pageNum: pageNum,
            pageSize: pageSize,
            orderByColumn: order,
            isAsc: orderList.filter(item => item.value === order)[0].asc ? "asc" : "desc",
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        return res.json();
      });
      const newUnStakedList = list.map((item: any) => {
        return {
          tokenId: item.tokenId,
          consumption: JSON.parse(item.attributes).consumption,
          hashRate: JSON.parse(item.attributes).hashrate,
          url: metaintelp4,
          checked: false,
          disabled: false,
        };
      });
      if (pageNum === 1) {
        setUnStakedList(newUnStakedList);
      } else {
        setUnStakedList([...unStakedList, ...newUnStakedList]);
      }
      setTotal(total);
      setFirstLoading(false);
      setListLoading(false);
    } catch (err) {
      console.log({ err });
      setFirstLoading(false);
      setListLoading(false);
      dispatch(error(t`Fail to get list`));
    }
  };

  const changeOrder = async (e: any) => {
    try {
      if (e.target.value || (e.target.classList && e.target.classList.contains("order-list"))) {
        if (e.target.value) {
          setOrder(e.target.value);
        }
        if (e.target.classList && e.target.classList.contains("order-list")) {
          const newOrderList = orderList.map(item => {
            if (item.value === order) item.asc = !item.asc;
            return item;
          });
          setOrderList(newOrderList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (provider && address && networkId === 56) {
      if (pageNum === 1) {
        getUnStakedList();
      } else {
        setPageNum(1);
      }
    }
  }, [networkId, connected, address]);

  useEffect(() => {
    if (pageNum === 1) {
      getUnStakedList();
    } else {
      setPageNum(1);
    }
  }, [order, orderList]);

  useEffect(() => {
    getUnStakedList();
  }, [pageNum]);

  const scrollHandler = useCallback(async () => {
    console.log(listLoading);
    if (unStakedList.length >= total) {
      console.log({ unStakedList });
      return;
    }
    if (listLoading) {
      return;
    }
    const targetNode = document.getElementById("mynft-view");
    //窗口高度
    const windowHeight = targetNode?.clientHeight || 0;
    //滚动高度
    const scrollTop = targetNode?.scrollTop || 0;
    //页面高度
    const documentHeight = targetNode?.scrollHeight || 0;
    if (Math.ceil(windowHeight + scrollTop) >= documentHeight) {
      console.log("触底啦");
      await setPageNum(pageNum + 1);
    }
  }, [unStakedList, total, listLoading]);

  return (
    <div id="mynft-view" onScroll={scrollHandler}>
      <div
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? ".6rem" : "1.4rem",
          paddingTop: isSmallScreen || isVerySmallScreen ? "1rem" : "1.4rem",
        }}
      >
        {isSmallScreen || isVerySmallScreen ? null : <div className="global-title mynft-title">My NFTs</div>}
        {firstLoading ? (
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
            <Typography variant="h5" style={{ marginLeft: "1rem", padding: "30vh 0" }}>
              {t`Communicating with blockchain nodes...`}
            </Typography>
          </Box>
        ) : (
          <div className="btc-card-box">
            {unStakedList && (
              <Box style={{ width: "100%", overflow: "hidden", marginBottom: "1rem" }}>
                <Select
                  labelId="order-select"
                  value={order}
                  onClick={changeOrder}
                  disableUnderline
                  className={`order-select ${orderList.filter(item => item.value === order)[0].asc ? "asc" : ""}`}
                  name="order"
                >
                  {orderList.map(item => (
                    <MenuItem value={item.value} className={`order-list ${item.asc ? "asc" : ""}`}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}
            {unStakedList &&
              unStakedList.map(el => {
                return (
                  <div className="btc-card-item-box">
                    <div
                      className="btc-card-item"
                      key={el.tokenId}
                      onClick={() => {
                        history.push(`/mynft/${el.tokenId}`, el);
                      }}
                    >
                      <img className="card-image" src={el.url} alt="" />
                      <div className="card-info">
                        {t`Meta-Intel Pentium 4 #`}
                        {el.tokenId}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        <Box hidden={!listLoading}>
          <Typography style={{ padding: "2rem 0" }}>{t`Loading More ...`}</Typography>
        </Box>
      </div>
    </div>
  );
};
export default memo(Market);
