import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Subheading from "./Subheading";

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("token");

  const faqData = [
    {
      question: "What makes SecurePAD different from other token launchpads?",
      answer: "Answer 1",
    },
    {
      question: "How do I get involved with SecurePAD?",
      answer: "Answer 3",
    },
    {
      question: "What is the future of SecurePAD?",
      answer: "Answer 3",
    },
    {
      question: "What are the risks associated with using SecurePAD?",
      answer: "Answer 3",
    },
    {
      question: "What is SecurePAD?",
      answer: "Answer 3",
    },
    {
      question: "How do I participate in an IDO on SecurePAD?",
      answer: "Answer 3",
    },
    // Add more FAQ data as needed
    // Other token category questions and answers
  ];

  const secData = [
    {
      question: "What is securedapp smart contract audit firm?",
      answer:
        "Securedapp smart contract audit firm is a company that specializes in reviewing and evaluating the security of smart contracts on blockchain platforms such as Ethereum. Our experts use industry-standard tools and techniques to identify potential vulnerabilities and provide recommendations for improvement.",
    },
    {
      question: "Why is smart contract audit important?",
      answer: "Answer 3",
    },
    {
      question: "What is securedapp smart contract audit firm?",
      answer: "Answer 3",
    },
    {
      question: "How does securedapp conduct smart contract audits?",
      answer: "Answer 3",
    },
    {
      question: "How does securedapp approach smart contract security?",
      answer: "Answer 3",
    },
    {
      question:
        "Can you give an example of a problem you have identified in a smart contract?",
      answer: "Answer 3",
    },
    {
      question: "How long does a smart contract audit take?",
      answer: "Answer 3",
    },
    {
      question: "Does Securedapp provide smart contract remediation services?",
      answer: "Answer 3",
    },
    {
      question: "Does Securedapp support multiple blockchain platforms?",
      answer: "Answer 3",
    },
    {
      question: "How can I contact Securedapp for a smart contract audit?",
      answer: "Answer 3",
    },
    // Add more FAQ data as needed
    // Other security category questions and answers
  ];

  const handleQuestionClick = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  const handleTokenClick = () => {
    setSelectedCategory("token");
  };

  const handleSecurityClick = () => {
    setSelectedCategory("security");
  };

  return (
    <div className="lg:py-[40px] lg:px-[100px] md:p-[70px] p-[20px] flex md:flex-row flex-col bg-black">
      <div className="md:w-3/6  lg:p-8 md:p-2 p-1.5">
        <SectionHeader content={"Frequently Asked Questions"} />
        <p className="text-[#FFFFFFB2] py-3 text-opacity-70 font-sans md:text-lg text-base font-normal leading-[150%]">
          Haven't found the answers you are looking for? Contact us at
          <span className="text-[#12D576]"> support@securdapp.in</span>
        </p>
        <div className="flex md:mt-0 mt-2 justify-start w-full gap-3 items-center">
          <button
            className={`w-1/2 ${
              selectedCategory === "token"
                ? "bg-[#12D576] text-black"
                : "bg-transparent text-white"
            } py-4 rounded-xl font-sans text-xl font-bold leading-[110%]`}
            onClick={handleTokenClick}
          >
            Token
          </button>
          <button
            className={`w-1/2 ${
              selectedCategory === "security"
                ? "bg-[#12D576] text-black"
                : "bg-transparent text-white"
            } py-4 border border-white rounded-xl font-sans text-xl font-semibold leading-[110%]`}
            onClick={handleSecurityClick}
          >
            Security
          </button>
        </div>
      </div>
      <div className="md:w-4/6 w-full lg:p-8 md:p-4 pt-6 text-left">
        {selectedCategory === "token" &&
          faqData.map((item, index) => (
            <div key={index} className="mb-6">
              <button
                className="flex items-center justify-between w-full px-4 py-2 bg-transparent rounded-lg shadow"
                onClick={() => handleQuestionClick(index)}
              >
                <h3 className="text-lg font-semibold text-left text-white">
                  {item.question}
                </h3>
                <span className="md:px-[0px]  pl-[30px]">
                  {" "}
                  <Subheading
                    content={selectedQuestion === index ? "-" : "+"}
                  />
                </span>
              </button>
              {selectedQuestion === index && (
                <div className="mt-2 p-4 bg-transparent rounded-none">
                  <Subheading content={item.answer} />
                </div>
              )}
            </div>
          ))}
        {selectedCategory === "security" &&
          secData.map((item, index) => (
            <div key={index} className="mb-6">
              <button
                className="flex items-center justify-between w-full px-4 py-2 bg-transparent rounded-lg shadow"
                onClick={() => handleQuestionClick(index)}
              >
                <h3 className="text-lg font-semibold text-left text-white">
                  {item.question}
                </h3>
                <span className="md:px-[0px]  pl-[30px]">
                  {" "}
                  <Subheading
                    content={selectedQuestion === index ? "-" : "+"}
                  />
                </span>
              </button>
              {selectedQuestion === index && (
                <div className="mt-2 p-4 bg-transparent rounded-none">
                  <Subheading content={item.answer} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAQ;
