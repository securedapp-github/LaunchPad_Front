import React from "react";

const Request = () => {
  return (
    <div className=" bg-gradient-to-bl from-emerald-800 to-black  flex lg:flex-row flex-col ">
      <div className="md:mx-[100px] mx-[50px] md:my-[50px] mt-[50px] mb-[0px]">
        <div className="text-white md:text-[36px] text-[25px] md:mb-[0px] mb-[10px]  font-bold font-sans leading-[110%] ">
          Securing Your{" "}
          <span className="text-[#12D576] text-opacity-80">Web3 Journey</span>,
          So You Focus on Building
        </div>
        <div className="text-customColor pt-1 mt-[15px] text-[16px] font-normal font-sans leading-[135%] text-opacity-80">
          Comprehensive Blockchain Security Solutions & Smart Contract
          Audits Secure your smart contract with SecureDApp.
        </div>
      </div>
      <div className="flex justify-center items-center md:mb-0 mb-[50px]">
        <button className=" lg:mt-[50px] md:mb-[20px] md:mt-[5px] mt-[25px] rounded-full py-2 px-8 border border-transparent text-black bg-gradient-to-r from-emerald-500 via-emerald-200 to-cyan-300 text-center font-sans md:text-2xl text-xl font-normal leading-normal">
          Request Your Audit Today
        </button>
      </div>
    </div>
  );
};

export default Request;
