import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../Style/main.css";
import Group from "../assets/Group.png";
import Vector from "../assets/Vector.png";
import Fox from "../assets/Fox.png";
import { useParams } from "react-router-dom";
import TOKENABI from "../ABI/TokenABI.json";
import { ethers } from "ethers";
import { formatAddress } from "../utils/address";
import { useNavigate } from "react-router-dom";
import { readContract } from "@wagmi/core";
import Loader from "utils/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  useSigner,
  useWaitForTransaction,
  useProvider,
  fromWei,
} from "wagmi";

function Main() {
  const navigate = useNavigate();
  const { TOKEN } = useParams();
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [mintmodal, setmintmodal] = useState(false);
  const [burnmodal, setburnmodal] = useState(false);

  const [tokenName, settokenName] = useState("");
  const [tokenSymbol, settokenSymbol] = useState("");
  const [tokenSupply, settokenSupply] = useState(0);

  const [mintUser, setmintUser] = useState("");
  const [mintValue, setmintValue] = useState(0);
  const [burnValue, setburnValue] = useState(0);

  const { data: signerData } = useSigner();
  const provider = useProvider();

  const TokenContract = useContract({
    addressOrName: TOKEN,
    contractInterface: TOKENABI,
    signerOrProvider: provider,
  });

  const addTokenMetamask = async () => {
    const tokenAddress1 = TOKEN;
    const tokenSymbol1 = tokenSymbol;
    const tokenDecimals = 18;
    // const tokenImage = 'http://placekitten.com/200/300';

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
      }

      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress1, // The address that the token is at.
            symbol: tokenSymbol1, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        toast.success("Token Added Successfully");
      } else {
        toast.error("Error In adding token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readToken = async () => {
    try {
      setLoading(true);
      console.log(signerData);
      let [name, symbol, supply] = await TokenContract.getTokenInfo();
      settokenName(name);
      settokenSymbol(symbol);
      supply = supply.toString();
      settokenSupply(ethers.utils.formatEther(supply));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (!signerData) return;
    readToken();
  }, [signerData, TOKEN]);

  const mintToken = async () => {
    try {
      setLoading(true);
      let TokenContracts = new ethers.Contract(TOKEN, TOKENABI, signerData);
      const tx = await TokenContracts.mint(
        mintUser,
        ethers.utils.parseUnits(mintValue.toString(), "ether")
      );
      const receipt = await tx.wait();
      console.log("Token Minted ", receipt);
      setModal(false);
      setmintmodal(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Error", e);
    }
  };

  const burnToken = async () => {
    try {
      setLoading(true);
      let TokenContracts = new ethers.Contract(TOKEN, TOKENABI, signerData);
      const tx = await TokenContracts.burn(
        ethers.utils.parseUnits(burnValue.toString(), "ether")
      );
      const receipt = await tx.wait();
      console.log("Token Burn ", receipt);
      setModal1(false);
      setburnmodal(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Error", e);
    }
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
        className="main"
        style={{ ...blurryDivStyle, padding: "2%", margin: "0 12% 0 15%" }}
      >
        <div className="mainFirstRow" style={{ width: "100%" }}>
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

          <div style={{ paddingLeft: "20px" }}>
            <div
              style={{
                padding: "0",
                margin: "0",
                fontSize: "35px",
                fontWeight: "700",
                color: "#12D576",
              }}
            >
              Manage Token
            </div>
            <div
              style={{ fontSize: "25px", color: "white", fontWeight: "300" }}
            >
              {formatAddress(TOKEN)}
            </div>
            <div
              style={{
                paddingTop: "4%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            ></div>

            <Button
              onClick={() => {
                addTokenMetamask();
              }}
              style={{
                backgroundColor: "#12D576",
                border: "#12D576",
                padding: "7px 15px",
                fontSize: "20px",
                fontWeight: "400",
              }}
              variant=""
            >
              Add Token To Metamask
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "20px",
                paddingTop: "4%",
                gap: "30px",
              }}
            >
              <div style={{ color: "white" }}>
                <div style={{ padding: "5px 0" }}>Token Name</div>
                <div style={{ padding: "5px 0" }}>Token Symbol</div>
                <div style={{ padding: "5px 0" }}>Token Supply</div>
              </div>
              <div style={{ color: "#525252" }}>
                <div style={{ padding: "5px 0" }}>{tokenName}</div>
                <div style={{ padding: "5px 0" }}>{tokenSymbol}</div>
                <div style={{ padding: "5px 0" }}>{tokenSupply}</div>
              </div>
            </div>
            <div
              style={{
                paddingTop: "4%",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <Button
                onClick={() => setModal(true)}
                style={{
                  backgroundColor: "#12D576",
                  border: "#12D576",
                  padding: "7px 75px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Mint
              </Button>
              <Button
                onClick={() => setModal1(true)}
                style={{
                  backgroundColor: "#12D576",
                  border: "#12D576",
                  padding: "7px 75px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Burn
              </Button>
              <Button
                onClick={() => setModal2(true)}
                style={{
                  backgroundColor: "#12D576",
                  border: "#12D576",
                  padding: "7px 25px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Change Owner
              </Button>
              <Button
                onClick={() => setModal3(true)}
                style={{
                  backgroundColor: "#12D576",
                  border: "#12D576",
                  padding: "7px 25px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Renounce Ownership
              </Button>
            </div>
            <div
              style={{
                paddingTop: "2%",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#12D576",
                  border: "2px solid #12D576",
                  padding: "7px 20px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Blacklist Address
              </Button>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#12D576",
                  border: "2px solid #12D576",
                  padding: "7px 70px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Pause
              </Button>
              <Button
                style={{
                  backgroundColor: "#12D576",
                  border: "#12D576",
                  padding: "7px 105px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Add Liquidity pool to DEX
              </Button>
            </div>
            <div
              style={{
                paddingTop: "2%",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#12D576",
                  border: "2px solid #12D576",
                  padding: "7px 30px",
                  fontSize: "20px",
                  fontWeight: "450",
                }}
                variant=""
              >
                Edit asset documentation
              </Button>
              <Button
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
                Change token per address limit
              </Button>
              <Button
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
                Force transaction
              </Button>
            </div>
          </div>
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
              <h4 style={{ fontWeight: "700" }}>Mint Token</h4>
              <div style={{ paddingTop: "30px" }}>Number of Tokens to Mint</div>
              <input
                type="number"
                value={mintValue}
                onChange={(e) => setmintValue(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "5px",
                  border: "1px solid #12D576",
                }}
              />
              <div style={{ paddingTop: "20px", fontWeight: "700" }}>
                Recipient Address{" "}
              </div>
              <input
                value={mintUser}
                onChange={(e) => setmintUser(e.target.value)}
                placeholder="Enter recipient address"
                type="text"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "5px",
                  border: "1px solid #949494",
                }}
              />
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
                    mintToken();
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
                  Submit
                </Button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            {...{
              show: modal1,
              onHide: () => setModal1(false),
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h4 style={{ fontWeight: "700" }}>Burn</h4>
              <div style={{ paddingTop: "30px" }}>
                Enter the number of tokens you want to burn
              </div>
              <div style={{ paddingTop: "20px" }}>Quantity</div>
              <input
                value={burnValue}
                onChange={(e) => setburnValue(e.target.value)}
                placeholder="e.g 50000"
                type="number"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "5px",
                  border: "1px solid #949494",
                }}
              />
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
                    setModal1(false);
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
                    burnToken();
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
                  Submit
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            {...{
              show: modal2,
              onHide: () => setModal2(false),
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h4 style={{ fontWeight: "700" }}>Burn</h4>
              <div>Test - current token supply 10,000.00</div>
              <div style={{ paddingTop: "30px" }}>Specify new owner below.</div>
              <div style={{ paddingTop: "20px" }}>Quantity</div>
              <input
                placeholder="Enter owner address"
                type="text"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "5px",
                  border: "1px solid #949494",
                }}
              />
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
                    setModal2(false);
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
                    setModal4(true);
                    setModal2(false);
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
                  Submit
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            {...{
              show: modal3,
              onHide: () => setModal3(false),
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div style={{ paddingTop: "8%", textAlign: "center" }}>
                <img src={Group} alt="not found" />
                <h4 style={{ fontWeight: "700" }}>Are you sure?</h4>
              </div>
              <div style={{ padding: "10% 12%" }}>
                If you renounce ownership , you will lose the ability to manage
                the token.
              </div>
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
                    setModal3(false);
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
                    setModal4(true);
                    setModal3(false);
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
                  Confirm
                </Button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            {...{
              show: modal4,
              onHide: () => setModal4(false),
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div
                style={{
                  paddingTop: "8%",
                  textAlign: "center",
                  paddingLeft: "9%",
                  paddingRight: "9%",
                }}
              >
                <img src={Vector} alt="not found" />
                <h5 style={{ fontWeight: "700", paddingTop: "10px" }}>
                  Token created successfully, view it on the block explorer
                </h5>
              </div>
              <div
                style={{
                  padding: "3% 8%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div>Token Address</div>
                  <div style={{ paddingTop: "30%" }}>Token Link</div>
                </div>
                <div>
                  <div style={{ color: "#2D5C8F" }}>
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                        fill="#2882E3"
                      />
                    </svg>
                    1519815165068165165162+965+6
                  </div>
                  <div style={{ color: "#2D5C8F", paddingTop: "10%" }}>
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                        fill="#2882E3"
                      />
                    </svg>
                    1519815165068165165162+965+6
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", paddingTop: "5%" }}>
                <Button
                  onClick={() => {
                    addTokenMetamask();
                  }}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "7px 40px",
                    fontSize: "20px",
                    fontWeight: "450",
                  }}
                  variant=""
                >
                  <img src={Fox} alt="" />
                  Add Token to Metamask
                </Button>
                <br />
                <Button
                  onClick={() => {
                    setModal4(true);
                    setModal3(false);
                  }}
                  style={{
                    marginTop: "3%",
                    backgroundColor: "#12D576",
                    border: "#12D576",
                    padding: "7px 40px",
                    fontSize: "20px",
                    fontWeight: "450",
                  }}
                  variant=""
                >
                  Go to Manage Token
                </Button>
                <div
                  style={{
                    color: "#12D576",
                    fontWeight: "600",
                    fontSize: "17px",
                    cursor: "pointer",
                    paddingTop: "3%",
                  }}
                >
                  Go back to create token
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            {...{
              show: mintmodal,
              onHide: () => setmintmodal(false),
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div
                style={{
                  paddingTop: "8%",
                  textAlign: "center",
                  paddingLeft: "9%",
                  paddingRight: "9%",
                }}
              >
                <img src={Vector} alt="not found" />
                <h5 style={{ fontWeight: "700", paddingTop: "10px" }}>
                  Token Minted Successfully, view it on the block explorer
                </h5>
              </div>
              <div
                style={{
                  padding: "3% 8%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div>Token Address</div>
                  <div style={{ paddingTop: "30%" }}>Token Link</div>
                </div>
                <div>
                  <div
                    style={{ color: "#2D5C8F" }}
                    onClick={() => {
                      navigator.clipboard.writeText(TOKEN);
                      toast.success("Address copied successfully");
                    }}
                  >
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                        fill="#2882E3"
                      />
                    </svg>
                    {formatAddress(TOKEN)}
                  </div>
                  <div
                    style={{ color: "#2D5C8F", paddingTop: "10%" }}
                    onClick={() => {
                      navigator.clipboard.writeText(TOKEN);
                      toast.success("Address copied successfully");
                    }}
                  >
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                        fill="#2882E3"
                      />
                    </svg>
                    {formatAddress(TOKEN)}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center", paddingTop: "5%" }}>
                <Button
                  onClick={() => {
                    setmintmodal(false);
                  }}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "7px 40px",
                    fontSize: "20px",
                    fontWeight: "450",
                  }}
                  variant=""
                >
                  <img src={Fox} alt="" />
                  Go Back
                </Button>
                <br />
                <Button
                  onClick={() => {
                    setmintmodal(false);
                  }}
                  style={{
                    marginTop: "3%",
                    backgroundColor: "#12D576",
                    border: "#12D576",
                    padding: "7px 40px",
                    fontSize: "20px",
                    fontWeight: "450",
                  }}
                  variant=""
                >
                  Go to Manage Token
                </Button>
                <div
                  style={{
                    color: "#12D576",
                    fontWeight: "600",
                    fontSize: "17px",
                    cursor: "pointer",
                    paddingTop: "3%",
                  }}
                >
                  Go back to create token
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            {...{
              show: burnmodal,
              onHide: () => setburnmodal(false),
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div
                style={{
                  paddingTop: "8%",
                  textAlign: "center",
                  paddingLeft: "9%",
                  paddingRight: "9%",
                }}
              >
                <img src={Vector} alt="not found" />
                <h5 style={{ fontWeight: "700", paddingTop: "10px" }}>
                  Token Burned Successfully, view it on the block explorer
                </h5>
              </div>
              <div
                style={{
                  padding: "3% 8%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div>Token Address</div>
                  <div style={{ paddingTop: "30%" }}>Token Link</div>
                </div>
                <div>
                  <div
                    style={{ color: "#2D5C8F" }}
                    onClick={() => {
                      navigator.clipboard.writeText(TOKEN);
                      toast.success("Address copied successfully");
                    }}
                  >
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                        fill="#2882E3"
                      />
                    </svg>
                    {TOKEN}
                  </div>
                  <div
                    style={{ color: "#2D5C8F", paddingTop: "10%" }}
                    onClick={() => {
                      navigator.clipboard.writeText(TOKEN);
                      toast.success("Address copied successfully");
                    }}
                  >
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V5C1.69779e-06 4.71667 0.0960018 4.479 0.288002 4.287C0.480002 4.095 0.717335 3.99934 1 4C1.28333 4 1.521 4.096 1.713 4.288C1.905 4.48 2.00067 4.71734 2 5V18H12C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19C13 19.2833 12.904 19.521 12.712 19.713C12.52 19.905 12.2827 20.0007 12 20H2ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H15C15.55 1.69779e-06 16.021 0.196002 16.413 0.588002C16.805 0.980002 17.0007 1.45067 17 2V14C17 14.55 16.804 15.021 16.412 15.413C16.02 15.805 15.5493 16.0007 15 16H6ZM6 14H15V2H6V14Z"
                        fill="#2882E3"
                      />
                    </svg>
                    {TOKEN}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center", paddingTop: "5%" }}>
                <Button
                  onClick={() => {
                    addTokenMetamask();
                  }}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "7px 40px",
                    fontSize: "20px",
                    fontWeight: "450",
                  }}
                  variant=""
                >
                  <img src={Fox} alt="" />
                  Add Token To Metamask
                </Button>
                <br />
                <Button
                  onClick={() => {
                    setburnmodal(false);
                  }}
                  style={{
                    marginTop: "3%",
                    backgroundColor: "#12D576",
                    border: "#12D576",
                    padding: "7px 40px",
                    fontSize: "20px",
                    fontWeight: "450",
                  }}
                  variant=""
                >
                  Go to Manage Token
                </Button>
                <div
                  style={{
                    color: "#12D576",
                    fontWeight: "600",
                    fontSize: "17px",
                    cursor: "pointer",
                    paddingTop: "3%",
                  }}
                >
                  Go back to create token
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Main;
