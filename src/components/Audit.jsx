import React from "react";
import SectionHeader from "./SectionHeader";
import Subheading from "./Subheading";
const AuditCard = {
  audits: [
    {
      heading: "Review of the smart contract code",
      description:
        "The auditors will review the code of the smart contract to understand its functionality and to identify any potential vulnerabilities. This step typically involves a static analysis of the code, which means that the auditors will not execute the code but will instead analyse it line by line.",
    },
    {
      heading: "Manual review of the smart contract",
      description:
        "The auditors will review the code of the smart contract to understand its functionality and to identify any potential vulnerabilities. This step typically involves a static analysis of the code, which means that the auditors will not execute the code but will instead analyse it line by line.",
    },
    {
      heading: "Manual review of the smart contract",
      description:
        "The auditors will then execute the smart contract on a test network to simulate real-world conditions. This step allows the auditors to identify vulnerabilities that may not have been apparent in the static analysis.",
    },
    {
      heading: "Reporting of the findings",
      description:
        "The auditors will then execute the smart contract on a test network to simulate real-world conditions. This step allows the auditors to identify vulnerabilities that may not have been apparent in the static analysis.",
    },
  ],
};

const Card = ({ heading, description }) => {
  return (
    <div className="p-4">
      <div className="bg-transparent border-white border rounded-[20px] p-6">
        <h2 className="md:text-2xl text-xl text-white font-sans leading-[100%] font-bold mb-4">
          {heading}
        </h2>
        <Subheading content={description} />
      </div>
    </div>
  );
};

const Audit = () => {
  return (
    <div className="lg:py-[80px] lg:px-[100px] md:p-[70px] p-[50px]  bg-[#0c4126] bg-opacity-30 ">
      <SectionHeader content={"The Audit Process"} />
      <div className="lg:pt-[30px] md:pt-[30px] pt-[30px] px-[5px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {AuditCard.audits.map((audit, index) => (
            <Card
              key={index}
              heading={audit.heading}
              description={audit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audit;
