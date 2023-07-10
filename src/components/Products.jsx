import React from "react";
import SectionHeader from "./SectionHeader";
import "../App.css";
import Subheading from "./Subheading";
const ProductCard = {
  products: [
    {
      heading: "Smart Contract Development",
      description:
        "Weprioritize security, ensuring that your decentralized applications are built with the highest level of protection.",
      link: "#", //read more link
    },
    {
      heading: "DApp Security Audit",
      description:
        "An automated, thorough and efficient audits of your smart contracts. Eliminate risks of hacks, exploits and front-running attacks from your decentralized apps with a top-tier audit methodology",
      link: "#", //read more link
    },
    {
      heading: "DApp Development",
      description:
        "SecureDApp is a blockchain security solution that offers a comprehensive range of services for developers building decentralised applications (DApps).",
      link: "#", //read more link
    },
    {
      heading: "Solidity Shield Scanner",
      description:
        "Solidity Shield Scanner is an AI-powered vulnerability detection application that uses static analysis and dynamic analysis to identify potential security vulnerabilities in Solidity smart contracts.",
      link: "#", //read more link
    },
    {
      heading: "SecurePAD's Token Launchpad",
      description:
        "SecurePAD is the world's first zero-fee, security-prominent, no-code, and cross-chain platform for anyone to create, trade, and manage the end-to-end lifecycle of a token.",
      link: "#", //read more link
    },
    {
      heading: "Tokenomics Design,  Development & Audit",
      description:
        "SecureDApp provides tokenomics design, development, and audit services to help businesses create and launch successful token-based projects.",
      link: "#", //read more link
    },
  ],
};

const Card = ({ heading, description, link }) => {
  return (
    <div className=" md:p-8 p-5 bg-gradient-to-r from-green-900 via-slate-800 to-slate-600 rounded-[20px]">
      <div className=" h-full flex flex-col justify-between rounded-lg overflow-hidden">
        <div>
          <h2 className="md:text-2xl text-xl text-white font-sans leading-[100%] font-bold mb-4">
            {heading}
          </h2>
          <Subheading content={description} />
        </div>
        <a
          href={link}
          className="text-[#12D576] font-sans underline font-normal text-xl mt-4 inline-block"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <div className="lg:py-[80px] lg:px-[100px] md:p-[70px] p-[50px] bg-gradient-to-l from-teal-900 to-black  ">
      <SectionHeader content={"SecureDApp’s Products and Services"} />
      <div className="lg:p-[30px] md:pt-[30px] pt-[30px] px-[5px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ProductCard.products.map((product, index) => (
            <Card
              key={index}
              heading={product.heading}
              description={product.description}
              link={product.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
