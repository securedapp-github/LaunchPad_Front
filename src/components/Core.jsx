import React from "react";
import l1 from "../images/cl1.png";
import l2 from "../images/cl2.png";
import l3 from "../images/cl3.png";
import SectionHeader from "./SectionHeader";
import Subheading from "./Subheading";

const value = {
  sections: [
    {
      image: l1,
      heading: "Blockchain Security",
      content:
        "We provide comprehensive smart contract audits for Ethereum blockchain applications. Our services help startups and enterprises to launch and maintain their applications with confidence, knowing that their code is secure and free of vulnerabilities.",
    },
    {
      image: l2,
      heading: "Ethereum Smart Contract Audits",
      content:
        "We provide comprehensive smart contract audits for Ethereum blockchain applications. Our services help startups and enterprises to launch and maintain their applications with confidence, knowing that their code is secure and free of vulnerabilities.",
    },
    {
      image: l3,
      heading: "Critical Security in the Blockchain Space",
      content:
        "Security is critical in the blockchain space. Any vulnerability in a smart contract can be exploited by malicious actors to steal funds or disrupt the operation of an application. Our audits help to protect your applications from these risks.          ",
    },
  ],
};

const Card = ({ image, heading, content }) => {
  return (
    <div className="p-4 md:px-[10px]">
      <div className="bg-transparent border-0">
        <img src={image} alt="" className=" mb-4" />
        <h2 className="md:text-2xl text-xl text-white font-sans leading-[100%] font-bold mb-4">
          {heading}
        </h2>
        <Subheading content={content} />
      </div>
    </div>
  );
};

const Core = () => {
  return (
    <div className="lg:py-[80px] lg:px-[100px] md:p-[70px] p-[50px]  bg-gradient-to-br from-emerald-900 to-black  ">
      <SectionHeader content={"SecureDApp’s Core "} />

      <div className="pt-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.sections.map((section, index) => (
            <Card
              key={index}
              image={section.image}
              heading={section.heading}
              content={section.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Core;
