import React from "react";
import Subheading from "./Subheading";
import hero from "../heroLaunch.png";
import Heading from "./Heading";
const Launch = () => {
  return (
    <div className="pt-[80px] ">
      <div className="flex p-[100px]">
        <div className="px-3 pt-7">
          <Heading content="Unlocking the DeFi Potential with SecurePAD" />
          <Subheading content="Discover the Power of Tokenomics with SecurePAD. Experience Exclusive Early Access to the Next Unicorn in DeFi Tokenization. Trustworthy Audited and Vetted Web3 Projects." />
        </div>
        <div className="mb-[100px]">
          <img src={hero} className="w-[1400px] h-[400px]" alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Launch;
