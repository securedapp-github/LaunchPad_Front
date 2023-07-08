import React from "react";

const SectionHeader = ({ content }) => {
  return (
    <div className=" md:text-4xl text-2xl text-center whitespace-break-spaces w-fit font-sans font-bold leading-[110%] bg-gradient-to-r from-green-500 to-blue-800 bg-clip-text text-transparent">
      {content}
    </div>
  );
};

export default SectionHeader;
