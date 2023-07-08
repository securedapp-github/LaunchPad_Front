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

  const handleQuestionClick = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  return (
    <div className="lg:py-[40px] lg:px-[100px] md:p-[70px] p-[50px] flex bg-black">
      <div className="w-3/6  p-8">
        <SectionHeader content={"Frequently Asked Questions"} />
      </div>
      <div className="w-4/6 p-8">
        {faqData.map((item, index) => (
          <div key={index} className="mb-6">
            <button
              className="flex items-center justify-between w-full px-4 py-2 bg-transparent rounded-lg shadow"
              onClick={() => handleQuestionClick(index)}
            >
              <h3 className="text-lg font-semibold text-white">
                {item.question}
              </h3>
              <Subheading content={selectedQuestion === index ? "-" : "+"} />
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
