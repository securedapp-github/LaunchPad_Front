import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Style/saletoken.css";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { formatAddress } from "../utils/address";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "utils/loader";

import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWalletClient,
  useBalance,
  useWaitForTransaction,
  usePublicClient,
} from "wagmi";
import { getContract } from "wagmi/actions";

import TOKENABI from "../ABI/TokenABI.json";
import SALEABI from "../ABI/SaleABI.json";
// import Sale from './sale';

function ManageSale() {
  const [loading, setLoading] = useState(false);

  const { SALE } = useParams();
  const { data: signerData } = useWalletClient();
  const [token, settoken] = useState("");
  const [tokenName, settokenName] = useState("");
  const [tokenSymbol, settokenSymbol] = useState("");
  const [tokenSupply, settokenSupply] = useState(0);
  const [payment, setpayment] = useState("");
  const [amount, setamount] = useState(0);
  const [sendtoken, setsendtoken] = useState(0);
  const [fund, setfund] = useState(0);

  const [price, setprice] = useState(0);
  const [soft, setsoft] = useState(0);
  const [hard, sethard] = useState(0);
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const [start, setstart] = useState(0);
  const [duration, setduration] = useState(0);
  const [cliff, setcliff] = useState(0);
  const [releasemonths, setreleasemonths] = useState(0);
  const [iswhitelist, setiswhitelist] = useState(false);
  const provider = usePublicClient();

  const SaleContract = getContract({
    addressOrName: SALE,
    contractInterface: SALEABI,
    signerOrProvider: provider,
  });

  const readSaleDetails = async () => {
    let [
      tokens,
      pay,
      tokenPrice,
      investorMin,
      investorMax,
      softCap,
      hardCap,
      saleStartTime,
      saleEndTime,
      cliff,
      lockMonths,
      whitelistOn,
      Raised,
    ] = await SaleContract.getSaleDetails();

    settoken(tokens);
    setpayment(pay);
    tokenPrice = tokenPrice.toString();
    setprice(tokenPrice);
    softCap = ethers.utils.formatEther(softCap.toString());
    setsoft(softCap);
    hardCap = ethers.utils.formatEther(hardCap.toString());
    sethard(hardCap);
    investorMin = ethers.utils.formatEther(investorMin.toString());
    setmin(investorMin);
    investorMax = ethers.utils.formatEther(investorMax.toString());
    setmax(investorMax);
    saleStartTime = saleStartTime.toString();
    setstart(saleStartTime);
    saleEndTime = saleEndTime.toString();
    setduration(saleEndTime);
    cliff = cliff.toString();
    setcliff(cliff);
    lockMonths = lockMonths.toString();
    setreleasemonths(lockMonths);
    setiswhitelist(whitelistOn);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let TokenContract = new ethers.Contract(tokens, TOKENABI, provider);

    let [name, symbol, supply] = await TokenContract.getTokenInfo();

    settokenName(name);
    settokenSymbol(symbol);
    supply = ethers.utils.formatEther(supply.toString());
    settokenSupply(supply);
    let amounts = await TokenContract.balanceOf(SALE);
    amounts = ethers.utils.formatEther(amounts.toString());
    setamount(amounts);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (pay != "0x0000000000000000000000000000000000000000") {
      let FundContract = new ethers.Contract(pay, TOKENABI, provider);
      let funds = await FundContract.balanceOf(SALE);
      funds = ethers.utils.formatEther(funds.toString());
      setfund(funds);
    } else {
      let provider = ethers.getDefaultProvider();
      let balance = await provider.getBalance(SALE);
      balance = ethers.utils.formatEther(balance.toString());
      setfund(balance);
    }
  };

  const blurryDivStyle = {
    filter: loading ? "blur(5px)" : "blur(0px)",
  };

  const sendTokenToSale = async () => {
    try {
      setLoading(true);

      let TokenContract = new ethers.Contract(token, TOKENABI, signerData);

      const tx = await TokenContract.transfer(
        SALE,
        ethers.utils.parseUnits(sendtoken.toString(), "ether")
      );
      const receipt = await tx.wait();
      if (receipt.status == 1) {
        toast.success("Token Transferred Successfully");
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error("An error occurred while token trasnfer");
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (!signerData) return;
    readSaleDetails();
  }, [signerData, SALE]);

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    navigate("/editsale/" + SALE);
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="dark"
        pauseOnHover
      />
      {loading && <Loader />}

      <div
        style={{ padding: "2%", margin: "0 10vw 0 20vw", ...blurryDivStyle }}
      >
        <div
          className="saleFirstRow"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div style={{ paddingTop: "0.1vw" }}>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              style={{
                background: "transparent",
                border: "1px solid transparent",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                width="35"
                style={{ fill: "#12D576" }}
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </Button>
          </div>

          <div style={{ paddingLeft: "20px", width: "75%" }}>
            <div
              style={{
                padding: "0",
                margin: "0",
                fontSize: "35px",
                fontWeight: "700",
                color: "#12D576",
              }}
            >
              Manage Token Sale
            </div>
            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "3vw",
              }}
            >
              Token sale information
            </div>
            <div
              style={{
                paddingTop: "1vw",
                fontSize: "20px",
                color: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div>Token name</div>
                <div style={{ paddingTop: "1vw" }}>Symbol</div>
                <div style={{ paddingTop: "1vw" }}>Token address</div>
                <div style={{ paddingTop: "1vw" }}>Token sale address</div>
                <div style={{ paddingTop: "1vw" }}>Total Token Supply</div>
                <div style={{ paddingTop: "1vw" }}>
                  Tokens currently on sale
                </div>
                <div style={{ paddingTop: "1vw", paddingBottom: "10%" }}>
                  Payment token
                </div>
              </div>
              <div>
                <div style={{ color: "#525252" }}>{tokenName}</div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {tokenSymbol}
                </div>
                <div style={{ paddingTop: "1vw" }}>
                  <svg
                    width="20"
                    height="22"
                    style={{ paddingRight: "2px" }}
                    viewBox="0 0 17 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                      fill="#12D576"
                    />
                  </svg>
                  {formatAddress(token)}
                </div>
                <div style={{ paddingTop: "1vw" }}>
                  <svg
                    width="20"
                    height="22"
                    style={{ paddingRight: "2px" }}
                    viewBox="0 0 17 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                      fill="#12D576"
                    />
                  </svg>
                  {formatAddress(SALE)}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {tokenSupply}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {amount}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {formatAddress(payment)}
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "20px", color: "#12D576" }}>
              Send Tokens to Sale Contract
            </div>
            <input
              value={sendtoken}
              onChange={(e) => setsendtoken(e.target.value)}
              placeholder="Enter Amount"
              type="number"
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #949494",
              }}
            />
            <Button
              onClick={() => {
                sendTokenToSale();
              }}
              style={{
                backgroundColor: "#12D576",
                border: "#12D576",
                marginTop: "2vw",
                padding: "7px 25px",
                fontSize: "20px",
                fontWeight: "450",
              }}
              variant=""
            >
              Send Token To Sale Contract
            </Button>
            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "8vw",
              }}
            >
              General Settings
            </div>
            <div
              style={{
                paddingTop: "1vw",
                fontSize: "20px",
                color: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div>Price per Token</div>
                <div style={{ paddingTop: "1vw" }}>Soft Cap in MATIC</div>
                <div style={{ paddingTop: "1vw" }}>Hard Cap in MATIC</div>
                <div style={{ paddingTop: "1vw" }}>
                  Min Investment in Sale Token
                </div>
                <div style={{ paddingTop: "1vw" }}>
                  Max Investment in Sale Token
                </div>
                <div style={{ paddingTop: "1vw" }}>Sale Start time</div>
                <div style={{ paddingTop: "1vw" }}>Sale End time</div>
                <div style={{ paddingTop: "1vw" }}>Sale Cliff Months</div>
                <div style={{ paddingTop: "1vw" }}>
                  Sale Release Months Span
                </div>
                <div style={{ paddingTop: "1vw", paddingBottom: "10%" }}>
                  Investor Whitelist
                </div>
              </div>
              <div>
                <div style={{ color: "#525252" }}>{price}</div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {soft}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {hard}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>{min}</div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>{max}</div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {start}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {duration}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {cliff}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {releasemonths}
                </div>
                <div style={{ color: "#525252", paddingTop: "1vw" }}>
                  {String(iswhitelist)}
                </div>
              </div>
            </div>
            <Button
              onClick={handleClick}
              style={{
                backgroundColor: "#12D576",
                border: "#12D576",
                marginTop: "2vw",
                padding: "7px 25px",
                fontSize: "20px",
                fontWeight: "450",
              }}
              variant=""
            >
              Edit token sale parameters
            </Button>
            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "7vw",
              }}
            >
              Investor Whitelist
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#cccccc", marginTop: "2vw" }}>
                No data available
              </div>
              <Button
                onClick={() => {
                  setModal(true);
                }}
                style={{
                  backgroundColor: "#12D576",
                  border: "#12D576",
                  marginTop: "2vw",
                  padding: "7px 25px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                + Add addresses
              </Button>
            </div>
            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "7vw",
              }}
            >
              Withdrawls
            </div>
            <div style={{ color: "#cccccc", marginTop: "2vw" }}>
              Sale Token Balance: {amount}
            </div>
            <Button
              disabled={true}
              style={{
                backgroundColor: "#12D576",
                border: "#12D576",
                marginTop: "0.1vw",
                padding: "7px 25px",
                fontSize: "20px",
                fontWeight: "450",
              }}
              variant=""
            >
              Withdraw all tokens
            </Button>
            <div style={{ color: "#cccccc", marginTop: "2vw" }}>
              Sale Funds Balance: {fund}
            </div>
            <Button
              disabled={true}
              style={{
                backgroundColor: "#12D576",
                border: "#12D576",
                marginTop: "0.1vw",
                padding: "7px 25px",
                fontSize: "20px",
                fontWeight: "450",
              }}
              variant=""
            >
              Withdraw all funds
            </Button>
            <Modal
              {...{
                show: modal,
                onHide: () => setModal(false),
              }}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <h4 style={{ fontWeight: "700" }}>
                  Add addresses to the whitelist
                </h4>
                <div id="drop-area">
                  <h2 class="drop-message">Click to upload</h2>
                  <input type="file" id="file-input" />
                </div>
                <div style={{ fontWeight: "550", paddingTop: "2vw" }}>
                  Insert Manually
                </div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  style={{ border: "1px solid #949494", borderRadius: "0.3vw" }}
                ></textarea>
                <div
                  style={{
                    width: "100%",
                    paddingTop: "15%",
                    display: "flex",
                    flexDirection: "row",
                    jsutifyContent: "space-between",
                    gap: "52%",
                  }}
                >
                  <Button
                    onClick={() => {
                      setModal(false);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      color: "#12D576",
                      border: "2px solid #12D576",
                      padding: "7px 25px",
                      fontSize: "20px",
                      fontWeight: "450",
                    }}
                    variant=""
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setModal(false);
                    }}
                    style={{
                      backgroundColor: "#12D576",
                      border: "#12D576",
                      padding: "7px 25px",
                      fontSize: "20px",
                      fontWeight: "450",
                    }}
                    variant=""
                  >
                    Save
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSale;
