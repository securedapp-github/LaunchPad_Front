import React from "react";
import SectionHeader from "./SectionHeader";
import Subheading from "./Subheading";
import l1 from "../images/l1.png";
import l2 from "../images/l2.png";
import l3 from "../images/l3.png";
import l4 from "../images/l4.png";

const value = {
  sections: [
    {
      image: l1,
      heading: "Improved Security",
      content:
        "Smart contract audits can help to identify and mitigate vulnerabilities in smart contracts, making them more secure against attack.",
    },
    {
      image: l2,
      heading: "Increased Trust",
      content:
        "Smart contract audits can help to increase the trust of users and investors in a project, as they demonstrate that the project has taken steps to ensure the security of its smart contracts.",
    },
    {
      image: l3,
      heading: "Reduced Risk",
      content:
        "Smart contract audits can help to reduce the risk of financial losses due to security vulnerabilities, as they can help to identify and fix problems before they cause damage.",
    },
    {
      image: l4,
      heading: "Improved Compliance",
      content:
        "Smart contract audits can help to ensure that a project is compliant with relevant regulations, as they can help to identify and fix compliance issues.",
    },
  ],
};

const Comp = ({ url, head, content }) => {
  return (
    <div className=" md:p-[60px] p-[10px] lg:w-1/4 w-full  ">
      <div>
        <div className=" p-[10px]">
          <img src={url} alt="" />
        </div>
        <div className="p-[10px]">
          <h2 className="text-[20px] font-sans font-bold leading-[100%] text-white">
            {head}
          </h2>
          <Subheading content={content} />
        </div>
      </div>
    </div>
  );
};
const Benefits = () => {
  return (
    <div className="lg:py-[80px] lg:px-[100px] md:p-[70px] p-[50px] bg-[#0c4126] bg-opacity-30">
      <SectionHeader content={"Benefits of Smart Contracts Audits "} />
      <div className="flex flex-wrap lg:flex-row ">
        {value.sections.map((val, index) => (
          <Comp
            key={index}
            url={val.image}
            head={val.heading}
            content={val.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Benefits;
