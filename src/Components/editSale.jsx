import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Vector from "../assets/Vector.png";
import Fox from "../assets/Fox.png";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { formatAddress } from "../utils/address";
import Loader from "utils/loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
} from "wagmi";
import { getContract } from "wagmi/actions";
import TOKENABI from "../ABI/TokenABI.json";
import SALEABI from "../ABI/SaleABI.json";

function EditSale() {
  const { SALE } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: signerData } = useWalletClient();
  const provider = usePublicClient();
  const [tokenName, settokenName] = useState(false);
  const [tokenSymbol, settokenSymbol] = useState(false);
  const [sale, setsale] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");

  const [custompayment, setcustompayment] = useState(false);
  const [payment, setpayment] = useState("");
  const [price, setprice] = useState(0);
  const [soft, setsoft] = useState(0);
  const [hard, sethard] = useState(0);
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const [startdate, setstartdate] = useState("");
  const [start, setstart] = useState(0);
  const [end, setend] = useState("");

  const [duration, setduration] = useState(0);
  const [cliff, setcliff] = useState(0);
  const [releasemonths, setreleasemonths] = useState(0);
  const [owner, setowner] = useState("");

  const SaleContract = getContract({
    addressOrName: SALE,
    contractInterface: SALEABI,
    signerOrProvider: provider,
  });
  const SaleContracts = getContract({
    addressOrName: SALE,
    contractInterface: SALEABI,
    signerOrProvider: signerData,
  });

  const readSaleDetails = async () => {
    setLoading(true);
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
      ,
    ] = await SaleContract.getSaleDetails();

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
    const starts = new Date(saleStartTime * 1000);
    setstartdate(starts.toLocaleString());

    saleEndTime = saleEndTime.toString();
    const ends = new Date(saleEndTime * 1000);
    setend(ends.toLocaleString());

    cliff = cliff.toString();
    setcliff(cliff);
    lockMonths = lockMonths.toString();
    setreleasemonths(lockMonths);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    let TokenContract = new ethers.Contract(tokens, TOKENABI, provider);

    let [name, symbol, supply] = await TokenContract.getTokenInfo();

    settokenName(name);
    settokenSymbol(symbol);

    if (pay != "0x0000000000000000000000000000000000000000") {
      setpayment(pay);
      setcustompayment(true);
      setSelectedOption("option2");
    } else {
      setcustompayment(false);
      setpayment("0x0000000000000000000000000000000000000000");
      setSelectedOption("option1");
    }
    setLoading(false);
  };

  useEffect(() => {
    readSaleDetails();
  }, []);

  const updateSale = async () => {
    try {
      setLoading(true);
      console.log(
        payment,
        price * 10000,
        start,
        duration,
        releasemonths,
        cliff,
        [
          ethers.utils.parseUnits(min.toString(), "ether"),
          ethers.utils.parseUnits(max.toString(), "ether"),
          ethers.utils.parseUnits(soft.toString(), "ether"),
          ethers.utils.parseUnits(hard.toString(), "ether"),
        ]
      );
      const tx = await SaleContracts.changeSaleParameters(
        payment,
        price * 10000,
        ethers.utils.parseUnits(min.toString(), "ether"),
        ethers.utils.parseUnits(max.toString(), "ether"),
        ethers.utils.parseUnits(soft.toString(), "ether"),
        ethers.utils.parseUnits(hard.toString(), "ether"),
        start,
        duration,
        releasemonths,
        cliff
      );
      const receipt = await tx.wait();

      if (receipt.status == 1) {
        toast.success("Sale Updated Successfully");
        setLoading(false);
      } else {
        toast.error("An error occurred while updating sale");
        setLoading(false);
      }
    } catch (e) {
      toast.error("An error occurred while updating sale");
      setLoading(false);
      console.log("Error", e);
    }
  };

  const handlePaymentChange = (event) => {
    if (event.target.value === "option2") {
      setpayment("");
      setcustompayment(true);
      setSelectedOption("option2");
    } else {
      setcustompayment(false);
      setpayment("0x0000000000000000000000000000000000000000");
      setSelectedOption("option1");
    }
  };

  const copyAddress = (copytext) => {
    navigator.clipboard.writeText(copytext);
  };

  const blurryDivStyle = {
    filter: loading ? "blur(5px)" : "blur(0px)",
  };

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
        style={{ ...blurryDivStyle, padding: "2%", margin: "0 10vw 0 20vw" }}
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

          <div style={{ paddingLeft: "20px", width: "65%" }}>
            <div
              style={{
                padding: "0",
                margin: "0",
                fontSize: "35px",
                fontWeight: "700",
                color: "#12D576",
              }}
            >
              Update Token Sale
            </div>

            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "6%",
              }}
            >
              Sale Token : {tokenName} ({tokenSymbol})
            </div>

            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "6%",
              }}
            >
              Payment Token
            </div>

            <div style={{ paddingTop: "1%" }}>
              <input
                type="radio"
                id="option1"
                name="myRadio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handlePaymentChange}
              />
              <label for="option1" style={{ color: "#cccccc" }}>
                MATIC
              </label>
              <br />
              <input
                type="radio"
                id="option2"
                name="myRadio"
                value="option2"
                checked={selectedOption === "option2"}
                style={{ padding: "4%" }}
                onChange={handlePaymentChange}
              />
              <label for="option2" style={{ color: "#cccccc" }}>
                Custom token
              </label>
            </div>

            {custompayment && (
              <>
                <div style={{ paddingTop: "20px", color: "#cccccc" }}>
                  Custom Payment Token Address
                </div>
                <input
                  type="text"
                  placeholder="Token Address"
                  value={payment}
                  onChange={(e) => setpayment(e.target.value)}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "5px",
                    border: "1px solid #949494",
                    backgroundColor: "#f4f4f4",
                  }}
                />
              </>
            )}

            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "6%",
              }}
            >
              Set Token Price
            </div>
            <div style={{ paddingTop: "20px", color: "#cccccc" }}>
              Price per token in Payment Token [ 1 Sale Token = X Payment Token]{" "}
            </div>
            <input
              type="number"
              placeholder="e.g. 0.1 if 1 Sale Token = 0.1 Payment Token: Min 0.0001"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #949494",
                backgroundColor: "#f4f4f4",
              }}
            />

            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "6%",
              }}
            >
              Set Token Sale Raised Amount Caps
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "6%",
                width: "100%",
              }}
            >
              <div style={{ width: "100%", paddingTop: "2%" }}>
                <div style={{ color: "#cccccc" }}>Soft Cap in Sale Token</div>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={soft}
                  onChange={(e) => setsoft(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #949494",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ width: "100%", paddingTop: "2%" }}>
                <div style={{ color: "#cccccc" }}>Hard Cap in Sale Token</div>
                <input
                  type="number"
                  placeholder="e.g. 1000000"
                  value={hard}
                  onChange={(e) => sethard(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #949494",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "6%",
              }}
            >
              Set Purchase Limits per investor in Sale Token
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "6%" }}>
              <div style={{ width: "100%", paddingTop: "2%" }}>
                <div style={{ color: "#cccccc", width: "100%" }}>
                  Minimum purchase (Sale Token)
                </div>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={min}
                  onChange={(e) => setmin(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #949494",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ width: "100%", paddingTop: "2%" }}>
                <div style={{ color: "#cccccc", width: "100%" }}>
                  Maximum purchase (Sale Token)
                </div>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  value={max}
                  onChange={(e) => setmax(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #949494",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "6%",
              }}
            >
              Set Sale New Timings
            </div>

            <div style={{ paddingTop: "20px", color: "#cccccc" }}>
              Sale Start Time : {startdate}
            </div>
            <input
              type="datetime-local"
              placeholder="yyyy-mm-dd hh:mm:ss"
              value={startdate}
              onChange={(e) => {
                setstartdate(e.target.value);
                const dateObject = new Date(e.target.value);
                setstart(Math.floor(dateObject.getTime() / 1000));
              }}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #949494",
                backgroundColor: "#f4f4f4",
              }}
            />

            <div style={{ paddingTop: "20px", color: "#cccccc" }}>
              Sale End Time : {end}
            </div>
            <input
              type="number"
              placeholder="Set new duration in days"
              value={duration}
              onChange={(e) => setduration(e.target.value)}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #949494",
                backgroundColor: "#f4f4f4",
              }}
            />

            <div
              style={{
                color: "#12D576",
                fontSize: "24px",
                fontWeight: "550",
                paddingTop: "6%",
              }}
            >
              Set Sale Vesting/Cliff/Release Schedule
            </div>
            <div style={{ paddingTop: "20px", color: "#cccccc" }}>
              Sale Cliff Months for Release
            </div>
            <input
              type="number"
              placeholder="e.g. 6"
              value={cliff}
              onChange={(e) => setcliff(e.target.value)}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #949494",
                backgroundColor: "#f4f4f4",
              }}
            />
            <div style={{ paddingTop: "20px", color: "#cccccc" }}>
              Total Monthly Release Installments
            </div>
            <input
              type="number"
              placeholder="e.g. If 12, Amount / 12 will be released monthly for 12 months after Cliff"
              value={releasemonths}
              onChange={(e) => setreleasemonths(e.target.value)}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #949494",
                backgroundColor: "#f4f4f4",
              }}
            />

            <Button
              onClick={() => {
                updateSale();
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
              Update Sale
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSale;
