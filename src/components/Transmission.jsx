import React from "react";

const Transmission = () => {
  return (
    <div className="lg:py-[80px] lg:px-[100px] md:p-[70px] p-[50px] bg-green-800 flex lg:justify-between lg:flex-row flex-col items-center    ">
      <div className=" md:text-[40px] text-3xl text-center whitespace-break-spaces w-fit font-sans font-bold leading-[110%] text-black">
        Receive Transmissions
      </div>
      <div className="py-8">
        <button className="email-button rounded-full bg-gray-500 text-white  flex items-center justify-between md:w-[500px] w-[300px]  py-7 px-9 ">
          <span class="email-text font-light font-sans text-2xl leading-[110%]">
            Your Email
          </span>
          <span class="arrow font-light font-sans text-2xl leading-[110%]">
            &gt;
          </span>
        </button>
      </div>
    </div>
  );
};

export default Transmission;
