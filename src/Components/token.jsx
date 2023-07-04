import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Style/token.css";
import Vector from "../assets/Vector.png";
import Fox from "../assets/Fox.png";
import { ethers } from "ethers";
import Loader from "utils/loader";
import Info from "./info.jsx";
import { formatAddress } from "../utils/address";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import ClipboardJS from "clipboard";

import { useAccount, useContract, useSigner, useProvider } from "wagmi";
import FACTORYABI from "../ABI/FactoryABI.json";

function Token(props) {
  const { theme } = props;
  const FACTORY_ADDRESS = process.env.REACT_APP_FACTORY_CONTRACT;
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState("");
  const [symbol, setSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState(0);
  const [maxSupply, setmaxSupply] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [newToken, setnewToken] = useState("");
  const [documents, setdocuments] = useState("");
  const [iskyc, setiskyc] = useState(false);
  const [isforce, setisforce] = useState(false);
  const [isdocument, setisdocument] = useState(false);
  const [loading, setLoading] = useState(false);
  const provider = useProvider();
  const DB_LINK = process.env.REACT_APP_DB;
  const { address } = useAccount();

  const { data: signerData } = useSigner();

  const FactoryContract = useContract({
    addressOrName: FACTORY_ADDRESS,
    contractInterface: FACTORYABI,
    signerOrProvider: signerData,
  });

  const addTokenMetamask = async () => {
    const tokenAddress1 = newToken;
    const tokenSymbol = symbol;
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
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
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

  const updateDB = async (tokennew, txnhash) => {
    const { chainId } = await provider.getNetwork();

    fetch(DB_LINK + "updateActivity", {
      method: "POST",
      body: JSON.stringify({
        user: address,
        event: 2,
        eventname: token,
        hash: txnhash,
        data: "",
        chain: chainId,
        address: tokennew,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {})
      .then((data) => {
        // toast.success('Token Purchased Successfully');
        // setLoading(false);
        // setTimeout(function(){window.location.reload(true);}, 5000);
      })
      .catch((err) => {
        console.log(err.message);
        // setLoading(false);
      });
  };

  const createToken = async () => {
    try {
      setLoading(true);
      // if(isdocument || iskyc || isforce || documents != ""){
      //   console.log(iskyc, isforce , documents);
      //   const tx = await FactoryContract.launchSecurityToken(documents, token, symbol, decimals, initialSupply, isforce);
      //   const receipt = await tx.wait()
      //   console.log("Token Launched = ", receipt.logs[0].address)
      //   setnewToken(receipt.logs[0].address);
      // //  setnewToken("0xA95C52AF59E43C528F24EFAC96A08e000012e0e3");

      // }else{

      console.log(
        token,
        symbol,
        decimals,
        "intial sup",
        ethers.utils.parseUnits(initialSupply, "ether").toString(),

        ethers.utils.parseUnits(maxSupply, "ether").toString()
      );
      console.log(
        token.length > 0,
        symbol.length > 0,
        decimals.length > 0,
        ethers.utils.parseUnits(initialSupply, "ether").toString().length > 0,
        ethers.utils.parseUnits(maxSupply, "ether").toString().length > 0
      );
      if (
        token.length > 0 &&
        symbol.length > 0 &&
        ethers.utils.parseUnits(initialSupply, "ether").toString().length > 0 &&
        ethers.utils.parseUnits(maxSupply, "ether").toString().length > 0
      ) {
        const tx = await FactoryContract.launchSecureToken(
          token,
          symbol,
          decimals,
          ethers.utils.parseUnits(initialSupply, "ether").toString(),
          ethers.utils.parseUnits(maxSupply, "ether").toString()
        );
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          await updateDB(receipt.logs[0].address, receipt.transactionHash);
          console.log("Token Launched = ", receipt.logs[0].address);
          setnewToken(receipt.logs[0].address);
          setModal(true);
        } else {
          toast.error("An error occurred while creating token");
        }
        //  setnewToken("0xA95C52AF59E43C528F24EFAC96A08e000012e0e3");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("All the fields are required");
      }
    } catch (e) {
      setLoading(false);
      console.log("Error", e);
      toast.error("An error occurred while creating token");
    }
  };

  const handleDocumentChange = () => {
    setisdocument(!isdocument);
    setdocuments("");
  };
  const handleForceChange = () => {
    setisforce(!isforce);
  };
  const handleKYCChange = () => {
    setiskyc(!iskyc);
  };
  const blurryDivStyle = {
    filter: loading ? "blur(5px)" : "blur(0px)",
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="dark"
        pauseOnHover
      />
      <div className="tokenBody" style={{ ...blurryDivStyle, padding: "2%" }}>
        <div className="tokenCreate">
          <h2 style={{ fontWeight: "700", color: "#12D576" }}>
            Create ERC20 Token
          </h2>
          <h4
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              fontWeight: "400",
            }}
          >
            Get started by connecting your wallet
          </h4>

          <div style={{ padding: "2%", display: "flex", flexDirection: "row" }}>
            {" "}
            <svg
              width="25"
              height="30"
              style={{ fill: "#12D576" }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="tokenIcon"
            >
              <path d="M 12,1.1992188 C 6.0447983,1.1992188 1.1992188,6.0447983 1.1992188,12 1.1992188,17.955156 6.0447935,22.800781 12,22.800781 17.95516,22.800781 22.800781,17.95516 22.800781,12 22.800781,6.0447935 17.955156,1.1992188 12,1.1992188 Z m 0,1.6015624 c 5.090444,0 9.199219,4.1087253 9.199219,9.1992188 0,5.09044 -4.108779,9.199219 -9.199219,9.199219 C 6.9095065,21.199219 2.8007812,17.090444 2.8007812,12 2.8007812,6.9095017 6.9095017,2.8007813 12,2.8007812 Z"></path>
              <path d="m 12,5.1992188 c -3.7460617,0 -6.8007813,3.0547195 -6.8007812,6.8007812 0,3.746053 3.0547179,6.800781 6.8007812,6.800781 3.746055,0 6.800781,-3.054726 6.800781,-6.800781 0,-3.7460633 -3.054728,-6.8007812 -6.800781,-6.8007812 z m 0,1.6015624 c 2.881347,0 5.199219,2.3178621 5.199219,5.1992188 0,2.881345 -2.317874,5.199219 -5.199219,5.199219 C 9.1186433,17.199219 6.8007812,14.881347 6.8007812,12 6.8007812,9.1186417 9.1186417,6.8007813 12,6.8007812 Z"></path>
            </svg>
            <label
              htmlFor="html"
              style={{ color: "#949494", padding: "3px 2%" }}
            >
              Simple, fast and convenient token generator
            </label>
          </div>
          <div style={{ padding: "2%", display: "flex", flexDirection: "row" }}>
            <svg
              width="25"
              height="30"
              style={{ fill: "#12D576" }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="tokenIcon"
            >
              <path d="M 12,1.1992188 C 6.0447983,1.1992188 1.1992188,6.0447983 1.1992188,12 1.1992188,17.955156 6.0447935,22.800781 12,22.800781 17.95516,22.800781 22.800781,17.95516 22.800781,12 22.800781,6.0447935 17.955156,1.1992188 12,1.1992188 Z m 0,1.6015624 c 5.090444,0 9.199219,4.1087253 9.199219,9.1992188 0,5.09044 -4.108779,9.199219 -9.199219,9.199219 C 6.9095065,21.199219 2.8007812,17.090444 2.8007812,12 2.8007812,6.9095017 6.9095017,2.8007813 12,2.8007812 Z"></path>
              <path d="m 12,5.1992188 c -3.7460617,0 -6.8007813,3.0547195 -6.8007812,6.8007812 0,3.746053 3.0547179,6.800781 6.8007812,6.800781 3.746055,0 6.800781,-3.054726 6.800781,-6.800781 0,-3.7460633 -3.054728,-6.8007812 -6.800781,-6.8007812 z m 0,1.6015624 c 2.881347,0 5.199219,2.3178621 5.199219,5.1992188 0,2.881345 -2.317874,5.199219 -5.199219,5.199219 C 9.1186433,17.199219 6.8007812,14.881347 6.8007812,12 6.8007812,9.1186417 9.1186417,6.8007813 12,6.8007812 Z"></path>
            </svg>
            <label
              htmlFor="css"
              style={{ color: "#949494", padding: "3px 2%" }}
            >
              No smart contract programming required
            </label>
            <br />
          </div>
          <div style={{ padding: "2%", display: "flex", flexDirection: "row" }}>
            <svg
              width="25"
              height="30"
              style={{ fill: "#12D576" }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="tokenIcon"
            >
              <path d="M 12,1.1992188 C 6.0447983,1.1992188 1.1992188,6.0447983 1.1992188,12 1.1992188,17.955156 6.0447935,22.800781 12,22.800781 17.95516,22.800781 22.800781,17.95516 22.800781,12 22.800781,6.0447935 17.955156,1.1992188 12,1.1992188 Z m 0,1.6015624 c 5.090444,0 9.199219,4.1087253 9.199219,9.1992188 0,5.09044 -4.108779,9.199219 -9.199219,9.199219 C 6.9095065,21.199219 2.8007812,17.090444 2.8007812,12 2.8007812,6.9095017 6.9095017,2.8007813 12,2.8007812 Z"></path>
              <path d="m 12,5.1992188 c -3.7460617,0 -6.8007813,3.0547195 -6.8007812,6.8007812 0,3.746053 3.0547179,6.800781 6.8007812,6.800781 3.746055,0 6.800781,-3.054726 6.800781,-6.800781 0,-3.7460633 -3.054728,-6.8007812 -6.800781,-6.8007812 z m 0,1.6015624 c 2.881347,0 5.199219,2.3178621 5.199219,5.1992188 0,2.881345 -2.317874,5.199219 -5.199219,5.199219 C 9.1186433,17.199219 6.8007812,14.881347 6.8007812,12 6.8007812,9.1186417 9.1186417,6.8007813 12,6.8007812 Z"></path>
            </svg>
            <label
              htmlFor="javascript"
              style={{ color: "#949494", padding: "3px 2%" }}
            >
              Get 100% ownership of generated tokens
            </label>
          </div>
          <div style={{ padding: "2%", display: "flex", flexDirection: "row" }}>
            <svg
              width="25"
              height="30"
              style={{ fill: "#12D576" }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="tokenIcon"
            >
              <path d="M 12,1.1992188 C 6.0447983,1.1992188 1.1992188,6.0447983 1.1992188,12 1.1992188,17.955156 6.0447935,22.800781 12,22.800781 17.95516,22.800781 22.800781,17.95516 22.800781,12 22.800781,6.0447935 17.955156,1.1992188 12,1.1992188 Z m 0,1.6015624 c 5.090444,0 9.199219,4.1087253 9.199219,9.1992188 0,5.09044 -4.108779,9.199219 -9.199219,9.199219 C 6.9095065,21.199219 2.8007812,17.090444 2.8007812,12 2.8007812,6.9095017 6.9095017,2.8007813 12,2.8007812 Z"></path>
              <path d="m 12,5.1992188 c -3.7460617,0 -6.8007813,3.0547195 -6.8007812,6.8007812 0,3.746053 3.0547179,6.800781 6.8007812,6.800781 3.746055,0 6.800781,-3.054726 6.800781,-6.800781 0,-3.7460633 -3.054728,-6.8007812 -6.800781,-6.8007812 z m 0,1.6015624 c 2.881347,0 5.199219,2.3178621 5.199219,5.1992188 0,2.881345 -2.317874,5.199219 -5.199219,5.199219 C 9.1186433,17.199219 6.8007812,14.881347 6.8007812,12 6.8007812,9.1186417 9.1186417,6.8007813 12,6.8007812 Z"></path>
            </svg>
            <label
              htmlFor="scss"
              style={{ color: "#949494", padding: "3px 2%" }}
            >
              Set custom token name, symbol and initial supply
            </label>
          </div>
          <div style={{ padding: "2%", display: "flex", flexDirection: "row" }}>
            <svg
              width="25"
              height="30"
              style={{ fill: "#12D576" }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="tokenIcon"
            >
              <path d="M 12,1.1992188 C 6.0447983,1.1992188 1.1992188,6.0447983 1.1992188,12 1.1992188,17.955156 6.0447935,22.800781 12,22.800781 17.95516,22.800781 22.800781,17.95516 22.800781,12 22.800781,6.0447935 17.955156,1.1992188 12,1.1992188 Z m 0,1.6015624 c 5.090444,0 9.199219,4.1087253 9.199219,9.1992188 0,5.09044 -4.108779,9.199219 -9.199219,9.199219 C 6.9095065,21.199219 2.8007812,17.090444 2.8007812,12 2.8007812,6.9095017 6.9095017,2.8007813 12,2.8007812 Z"></path>
              <path d="m 12,5.1992188 c -3.7460617,0 -6.8007813,3.0547195 -6.8007812,6.8007812 0,3.746053 3.0547179,6.800781 6.8007812,6.800781 3.746055,0 6.800781,-3.054726 6.800781,-6.800781 0,-3.7460633 -3.054728,-6.8007812 -6.800781,-6.8007812 z m 0,1.6015624 c 2.881347,0 5.199219,2.3178621 5.199219,5.1992188 0,2.881345 -2.317874,5.199219 -5.199219,5.199219 C 9.1186433,17.199219 6.8007812,14.881347 6.8007812,12 6.8007812,9.1186417 9.1186417,6.8007813 12,6.8007812 Z"></path>
            </svg>
            <label
              htmlFor="sass"
              style={{ color: "#949494", padding: "3px 2%" }}
            >
              Sign and create with your own wallet
            </label>
          </div>
        </div>

        <div className="tokenSettings">
          <h2 style={{ color: `${theme === "Dark" ? "white" : "black"}` }}>
            Token Settings
          </h2>

          <div
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              padding: "2%",
            }}
          >
            Token Name
            <Info
              infos="Specify the human-readable name of your token"
              link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
              id="my-anchor-element1"
            />
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{
                height: "48px",
                color: `${theme === "Dark" ? "white" : "black"}`,
                width: "100%",
                backgroundColor: "#2D5C8F1C",
                border: "1px solid #464646",
                borderRadius: "7px",
              }}
            ></input>
          </div>

          <div
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              padding: "2%",
            }}
          >
            Token Symbol
            <Info
              infos="Specify the shorthand symbol that represents token in a shorter format"
              link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
              id="my-anchor-element2"
            />
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              style={{
                height: "48px",
                color: `${theme === "Dark" ? "white" : "black"}`,
                width: "100%",
                backgroundColor: "#2D5C8F1C",
                border: "1px solid #464646",
                borderRadius: "7px",
              }}
            ></input>
          </div>
          <div
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              padding: "2%",
            }}
          >
            Initial Token Supply to Owner (Optional)
            <Info
              infos="Set the initial number of tokens that will be allocated to the token owner"
              link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
              id="my-anchor-element3"
            />
            <input
              type="text"
              value={maxSupply}
              onChange={(e) => setmaxSupply(e.target.value)}
              onKeyPress={(e) => {
                const keyCode = e.which || e.keyCode;
                const isValidKey = keyCode >= 48 && keyCode <= 57;

                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              style={{
                height: "48px",
                color: `${theme === "Dark" ? "white" : "black"}`,
                width: "100%",
                backgroundColor: "#2D5C8F1C",
                border: "1px solid #464646",
                borderRadius: "7px",
                paddingLeft: "5px",
              }}
            ></input>
          </div>
          <div
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ padding: "2%" }}>
              {" "}
              MAX Token Supply (Optional)
              <Info
                infos="Define the upper limit of the total number of tokens that can ever be minted or created for your token"
                link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
                id="my-anchor-element4"
              />
              <input
                type="number"
                value={initialSupply}
                onChange={(e) => setInitialSupply(e.target.value)}
                style={{
                  height: "48px",
                  color: `${theme === "Dark" ? "white" : "black"}`,
                  width: "100%",
                  backgroundColor: "#2D5C8F1C",
                  border: "1px solid #464646",
                  borderRadius: "7px",
                }}
              ></input>
            </div>
            <div hidden style={{ padding: "2%" }}>
              {" "}
              Decimals (0-18)*
              <input
                hidden
                type="number"
                readOnly
                value="18"
                // value={decimals}
                // pattern="\d+"
                // onChange={(e) => setDecimals(e.target.value)}
                style={{
                  height: "48px",
                  color: `${theme === "Dark" ? "white" : "black"}`,
                  width: "100%",
                  backgroundColor: "#2D5C8F1C",
                  border: "1px solid #464646",
                  borderRadius: "7px",
                }}
              ></input>
            </div>
          </div>

          <h2
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              padding: "2%",
            }}
          >
            Security Token
            <Info
              infos="Underlines the fields required for Security Tokens"
              link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
              id="my-anchor-element5"
            />
          </h2>

          <div
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              padding: "2%",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={isdocument}
                onChange={handleDocumentChange}
              />
              Has Document
              <Info
                infos="Additional information about the token's characteristics and terms inc legal prospectus or offering memorandum"
                link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
                id="my-anchor-element6"
              />
            </label>
          </div>
          {isdocument && (
            <>
              <input
                type="text"
                placeholder="Token Documents Link"
                value={documents}
                onChange={(e) => setdocuments(e.target.value)}
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
              color: `${theme === "Dark" ? "white" : "black"}`,
              padding: "2%",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={isforce}
                onChange={handleForceChange}
              />
              Can be Force Transferred
              <Info
                infos="Allow authorized entities to transfer tokens without the consent of the token holders"
                link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
                id="my-anchor-element7"
              />
            </label>
          </div>

          <div
            style={{
              color: `${theme === "Dark" ? "white" : "black"}`,
              padding: "2%",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={iskyc}
                onChange={handleKYCChange}
              />
              KYC Mandatory
              <Info
                infos="Indicates whether KYC verification is mandatory for token holders"
                link="https://securedapp.gitbook.io/securedapp-launchpad/token-creation"
                id="my-anchor-element8"
              />
            </label>
          </div>

          <div style={{ padding: "2%" }}></div>
          <Button
            type="button"
            className="createtoken-button"
            onClick={() => {
              createToken();
            }}
          >
            Create Token
          </Button>
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
                Token Created Successfully
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
                  style={{
                    color: "#2D5C8F",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "7px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(newToken);
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
                  {formatAddress(newToken)}
                </div>
                <div
                  style={{
                    color: "#2D5C8F",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "7px",
                    paddingTop: "30px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(newToken);
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
                  {formatAddress(newToken)}
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
                Add to Metamask
              </Button>
              <br />

              <Link to={`/managetoken/${newToken}`}>
                <Button
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
              </Link>

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
    </>
  );
}

export default Token;
