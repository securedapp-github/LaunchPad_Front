import React from "react";
import Subheading from "./Subheading";
import hero from "../heroLaunch.png";
import Heading from "./Heading";
const Launch = () => {
  return (
    <div className="md:pt-[80px] pt-[60px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-lime-900 via-black to-green-700  ">
      <div className="flex lg:flex-row md:flex-row  md:p-[100px] p-[30px] flex-col-reverse">
        <div className="px-3 pt-7 flex-shrink">
          <Heading content="Unlocking the DeFi    Potential with SecurePAD" />
          <Subheading content="Discover the Power of Tokenomics with SecurePAD. Experience Exclusive Early Access to the Next Unicorn in DeFi Tokenization. Trustworthy Audited and Vetted Web3 Projects." />
          <h3 className="text-green-500 font-roboto md:text-2xl text-xl  font-semibold leading-[110%] mt-[50px]">
            Embark on the Future of Fundraising with us.
          </h3>

          <button className="mt-[50px] rounded-full py-2 px-7 border border-white text-white text-center font-sans md:text-2xl text-xl font-normal leading-normal">
            Exciting Upcoming Project
          </button>
        </div>
        <div className="md:mb-[100px] mt-[40px]">
          <img
            src={hero}
            className="md:w-[1400px] md:h-[400px] w-auto h-auto"
            alt="hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Launch;
