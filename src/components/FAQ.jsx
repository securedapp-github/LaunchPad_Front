import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Subheading from "./Subheading";

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const faqData = [
    {
      question: "What makes SecurePAD different from other token launchpads?",
      answer: "Answer 1",
    },
    // {
    //   question:
    //     "What are the requirements for projects that want to launch an IDO on SecurePAD?",
    //   answer: "Answer 2",
    // },
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
  ];

  const secData = [
    {
      question: "secuity question",
      answer: "Answer 1",
    },
    // {
    //   question:
    //     "What are the requirements for projects that want to launch an IDO on SecurePAD?",
    //   answer: "Answer 2",
    // },
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
  ];
  const handleQuestionClick = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  return (
    <div className="lg:py-[40px] lg:px-[100px] md:p-[70px] p-[30px] flex bg-black">
      <div className="w-3/6  lg:p-8 md:p-2 p-1">
        <SectionHeader content={"Frequently Asked Questions"} />
        <p className="text-[#FFFFFFB2] py-3 text-opacity-70 font-sans text-lg font-normal leading-[150%]">
          Haven't found the answers you are looking for? Contact us at
          <span className="text-[#12D576]"> support@securdapp.in</span>
        </p>
        <div className="flex justify-start w-full gap-3 items-center">
          <button className="w-1/2">Token</button>
          <button className="w-1/2">Security</button>
        </div>
      </div>
      <div className="w-4/6 lg:p-8 md:p-4 text-left">
        {faqData.map((item, index) => (
          <div key={index} className="mb-6">
            <h1>Token</h1>
            <button
              className="flex items-center justify-between w-full px-4 py-2 bg-transparent rounded-lg shadow"
              onClick={() => handleQuestionClick(index)}
            >
              <h3 className="text-lg font-semibold text-left text-white">
                {item.question}
              </h3>
              <span className="md:px-[0px]  pl-[30px]">
                {" "}
                <Subheading content={selectedQuestion === index ? "-" : "+"} />
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
