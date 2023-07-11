import React from "react";
import SectionHeader from "./SectionHeader";
import clientLogo from "../clientlogos.png";
// const IconImages = {
//     "url1": ""
// }

const Clients = () => {
  return (
    <div className="bg-gradient-to-br from-green-950 to-black   md:p-[100px] p-[50px] flex lg:flex-row md:flex-col flex-col ">
      <div className="lg:w-4/12 mr-[50px]">
        <SectionHeader content={"Client"} />
        <div className="text-customColor pt-1 md:text-[20px] text-[18px] mt-[20px] font-normal font-sans leading-[135%] text-opacity-80 ">
          Leading DApp startups trust us to secure their blockchain applications
        </div>
      </div>
      <div className="flex flex-wrap lg:px-[30px] lg:ml-[40px] lg:mt-0 mt-[50px] ">
        <img
          src={clientLogo}
          alt="logos"
          className="md:w-auto md:h-auto w-[600px] h-[100px]"
        />
      </div>
    </div>
  );
};

export default Clients;
