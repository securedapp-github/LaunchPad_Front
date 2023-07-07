import React from "react";

const Heading = ({ content }) => {
  return (
    <div className="text-white md:text-[36px] text-[25px] md:mb-[0px] mb-[10px]  font-bold font-sans leading-[110%] ">
      {content}
    </div>
  );
};

export default Heading;
