import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Loader from "utils/loader";
import TOKENABI from "../ABI/TokenABI.json";
import AIRDROPABI from "../ABI/AirdropABI.json";
import { ethers } from "ethers";

import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWalletClient,
  useWaitForTransaction,
  usePublicClient,
} from "wagmi";

function DistributeToken(props) {
  const { theme } = props;
  const [token, settoken] = useState("");
  const [isUpload, setisUpload] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const [totalamount, settotalamount] = useState(0);
  const [loading, setLoading] = useState(false);
  const AIRDROP_ADDRESS = process.env.REACT_APP_AIRDROP_CONTRACT;
  const { data: signerData } = useWalletClient();
  const [balance, setbalance] = useState(0);
  const { address } = useAccount();
  const provider = usePublicClient();

  const sendToken = async () => {
    try {
      setLoading(true);

      let addresses = [];
      let amounts = [];

      for (let i = 0; i < csvData.length; i++) {
        addresses = [...addresses, csvData[i][0]];
        amounts = [
          ...amounts,
          ethers.utils.parseUnits(Number(csvData[i][1]).toString(), "ether"),
        ];
      }
      console.log("addresses : ", addresses);
      console.log("amounts : ", amounts);

      if (token == "0x0000000000000000000000000000000000000000") {
        let AirdropCONTRACT = new ethers.Contract(
          AIRDROP_ADDRESS,
          AIRDROPABI,
          signerData
        );

        const tx = await AirdropCONTRACT.airdropNative(addresses, amounts, {
          value: ethers.utils.parseUnits(totalamount.toString(), "ether"),
        });
        const receipt = await tx.wait();
        if (receipt.status == 1) {
          alert("Drop Successful toast");
          setLoading(false);
        }
      } else {
        let TOKENCONTRACT = new ethers.Contract(token, TOKENABI, signerData);

        let AirdropCONTRACT = new ethers.Contract(
          AIRDROP_ADDRESS,
          AIRDROPABI,
          signerData
        );

        const tx = await TOKENCONTRACT.approve(
          AIRDROP_ADDRESS,
          ethers.utils.parseUnits(totalamount.toString(), "ether")
        );
        const receipt = await tx.wait();
        if (receipt.status == 1) {
          const tx2 = await AirdropCONTRACT.airdropTokens(
            token,
            addresses,
            amounts
          );
          const receipt2 = await tx2.wait();
          if (receipt2.status == 1) {
            alert("drop success toast");
            setLoading(false);
          }
        } else {
          alert("approve failed");
        }
      }
    } catch (e) {
      setLoading(false);
      console.log("Error", e);
    }
  };

  const continueFlow = () => {
    if (csvData.length > 0 && token != "") {
      setisUpload(true);
    } else {
      alert("Invlaid Input");
    }
  };

  const handleFileUpload = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target.result;
        const lines = contents.split("\n");
        const data = [];

        for (let i = 0; i < lines.length; i++) {
          const row = lines[i].split(",");
          data.push(row);
        }
        console.log(data);
        setCSVData(data);
        calculateTotalAmount(data);
      };

      reader.readAsText(file);
    } catch (e) {
      setLoading(false);
      console.log("Error", e);
    }
  };

  const handleDelete = (index) => {
    const updatedData = [...csvData];
    updatedData.splice(index, 1);
    setCSVData(updatedData);
    calculateTotalAmount(updatedData);
  };

  const calculateTotalAmount = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += parseFloat(data[i][1]);
    }
    settotalamount(total);
  };

  const blurryDivStyle = {
    filter: loading ? "blur(5px)" : "blur(0px)",
  };

  function GetCSV() {
    return (
      <div style={{ padding: "0 2%" }}>
        <h2 style={{ fontWeight: "700", color: "#12D576", paddingLeft: "5%" }}>
          Airdrop Tokens in One Click
        </h2>
        <div className="tokenBody" style={{ padding: "2%" }}>
          <div className="tokenCreate" style={{ width: "45%" }}>
            <div
              style={{
                paddingTop: "1%",
                padding: "2%",
                display: "flex",
                flexDirection: "row",
              }}
            >
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
                Token multisender dapp for all your tokens
              </label>
            </div>
            <div
              style={{ padding: "2%", display: "flex", flexDirection: "row" }}
            >
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
                htmlFor="css"
                style={{ color: "#949494", padding: "3px 2%" }}
              >
                Send your tokens to multiple recipients efficiently
              </label>
              <br />
            </div>
            <div
              style={{ padding: "2%", display: "flex", flexDirection: "row" }}
            >
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
                htmlFor="javascript"
                style={{ color: "#949494", padding: "3px 2%" }}
              >
                Send stable coins or cryptocurrency for dividend or coupon
                payments
              </label>
            </div>
            <div
              style={{ padding: "2%", display: "flex", flexDirection: "row" }}
            >
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
                htmlFor="scss"
                style={{ color: "#949494", padding: "3px 2%" }}
              >
                Input list of addresses and amounts manually
              </label>
            </div>
            <div
              style={{ padding: "2%", display: "flex", flexDirection: "row" }}
            >
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
                htmlFor="sass"
                style={{ color: "#949494", padding: "3px 2%" }}
              >
                Distribute automatically via CSV upload (download a holder
                snapshot like here)
              </label>
            </div>
          </div>
          <div
            className="tokenSettings"
            style={{
              width: "45%",
              backgroundColor: "transparent",
              border: "0",
              borderLeft: "1px solid",
            }}
          >
            <h3 style={{ color: `${theme === "Dark" ? "black" : "white"}` }}>
              Select token
            </h3>
            <div style={{ color: `${theme === "Dark" ? "black" : "white"}` }}>
              Token
            </div>
            <input
              type="text"
              value={token}
              onChange={(e) => settoken(e.target.value)}
              style={{
                margin: "10px",
                marginLeft: "0",
                marginBottom: "10px",
                height: "50px",
                backgroundColor: "transparent",
                border: "1px solid #464646",
                borderRadius: "7px",
                width: "100%",
                color: `${theme === "Dark" ? "white" : "black"}`,
              }}
            />

            <div style={{ color: `${theme === "Dark" ? "black" : "white"}` }}>
              Upload CSV
              <a
                target="_blank"
                style={{ color: `${theme === "Dark" ? "black" : "white"}` }}
                href="https://docs.google.com/spreadsheets/d/10zBcQ1lS_10mnFi2NC8xkhlLmPhqAb2Qxz2RGUNI0QA/edit?usp=sharing"
              >
                ( Sample CSV )
              </a>
            </div>

            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{
                margin: "10px",
                marginLeft: "0",
                marginBottom: "10px",
                height: "50px",
                backgroundColor: "transparent",
                border: "1px solid #464646",
                borderRadius: "7px",
                width: "100%",
                color: `${theme === "Dark" ? "white" : "black"}`,
              }}
            />

            <button
              onClick={() => {
                continueFlow();
              }}
              style={{
                padding: "2% 7%",
                backgroundColor: "#12D576",
                borderRadius: "30px",
                marginTop: "1%",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getUserBalance = async () => {
    try {
      setLoading(true);
      if (token != "0x0000000000000000000000000000000000000000") {
        let FundContract = new ethers.Contract(token, TOKENABI, provider);
        let funds = await FundContract.balanceOf(address);
        funds = ethers.utils.formatEther(funds.toString());
        setbalance(funds);
        setLoading(false);
      } else {
        let provider = ethers.getDefaultProvider();
        let balance = await provider.getBalance(address);
        balance = ethers.utils.formatEther(balance.toString());
        setbalance(balance);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (typeof address == "undefined" || token == "") return;
    getUserBalance();
  }, [address, token]);

  return (
    <>
      {loading && <Loader />}

      {!isUpload && <GetCSV />}

      {isUpload && (
        <div
          style={{ ...blurryDivStyle, padding: "2vw", margin: "0 10vw 0 20vw" }}
        >
          <div
            className="saleFirstRow"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div style={{ paddingTop: "1vw" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2vw"
                width="2vw"
                style={{ fill: "#12D576" }}
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </div>
            <div>
              <div style={{ paddingLeft: "1.25vw", width: "100%" }}>
                <div
                  style={{
                    padding: "0",
                    margin: "0",
                    fontSize: "2.5vw",
                    fontWeight: "700",
                    color: "#12D576",
                  }}
                >
                  Distribute Token
                </div>
                {/* <div style={{ fontSize: "1vw", color: "#cccccc" }}>Step 1 of 2. Confirm</div> */}
                <div
                  style={{
                    paddingTop: "4vw",
                    fontSize: "2vw",
                    fontWeight: "650",
                    color: "#12D576",
                  }}
                >
                  List of recipients
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "1vw",
                    color: "#cccccc",
                    paddingTop: "2vw",
                  }}
                >
                  {csvData.length > 0 && (
                    <table>
                      <thead>
                        <tr>
                          <th>Address</th>
                          <th>Amount</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.map((row, index) => (
                          <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>
                              <button onClick={() => handleDelete(index)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* <div>
                                    <div style={{ fontWeight: "700" }}>Address</div>
                                    <div style={{ paddingTop: "1vw" }}>0xC61E6A1C7AA4F35e76D3a6fDBC16675f013f3c63</div>
                                </div>
                                <div style={{ paddingLeft: "1vw" }}>
                                    <div style={{ fontWeight: "700" }}>Amount</div>
                                    <div style={{ paddingTop: "1vw" }}>USDTTEST 123.0</div>
                                </div>
                                <div style={{ paddingLeft: "1vw" }}>
                                    <div >Edit</div>
                                    <div style={{ paddingTop: "1vw", color: "#fe2b29" }}><svg height="1vw" width="1vw" style={{ fill: "#fe2b29" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg>Remove</div>
                                </div> */}
                </div>

                <div
                  style={{
                    paddingTop: "4vw",
                    fontSize: "2vw",
                    fontWeight: "650",
                    color: "#12D576",
                  }}
                >
                  Summary
                </div>
                <div
                  style={{
                    display: "flex",
                    paddingTop: "2vw",
                    gap: "2vw",
                    fontSize: "1vw",
                    color: "#cccccc",
                  }}
                >
                  <div>
                    <div style={{ paddingTop: "1vw" }}>Token Address</div>
                    <div style={{ paddingTop: "1vw" }}>
                      Total number of addresses
                    </div>
                    <div style={{ paddingTop: "1vw" }}>
                      Total number of tokens to be sent
                    </div>
                    <div style={{ paddingTop: "1vw" }}>
                      Total number of transactions needed
                    </div>
                    <div style={{ paddingTop: "1vw" }}>Your token balance</div>
                  </div>
                  <div>
                    <div style={{ paddingTop: "1vw" }}>{token}</div>
                    <div style={{ paddingTop: "1vw" }}>{csvData.length}</div>
                    <div style={{ paddingTop: "1vw" }}>{totalamount}</div>
                    <div style={{ paddingTop: "1vw" }}>1 Native & 2 ERC20 </div>
                    <div style={{ paddingTop: "1vw" }}>{balance}</div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    sendToken();
                  }}
                  style={{
                    backgroundColor: "#12D576",
                    border: "#12D576",
                    marginTop: "2vw",
                    padding: "0.5vw 1.5vw",
                    fontSize: "1.25vw",
                    fontWeight: "450",
                  }}
                  variant=""
                >
                  DROP
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DistributeToken;
