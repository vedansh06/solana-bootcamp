"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Solaris Token?",
      answer:
        "Solaris is a next-generation cryptocurrency built on Solana blockchain, designed for fast, secure, and low-cost transactions with advanced DeFi capabilities.",
    },
    {
      question: "How do I participate in the ICO?",
      answer:
        "Connect your Solana wallet (Phantom or Solflare), enter the amount of tokens you want to purchase, and confirm the transaction. Tokens will be sent to your wallet immediately.",
    },
    {
      question: "What is the minimum purchase amount?",
      answer:
        "There is no strict minimum, but we recommend purchasing at least 100 SLR tokens to make the transaction fees worthwhile.",
    },
    {
      question: "When will tokens be distributed?",
      answer:
        "Tokens are distributed immediately after purchase. They will appear in your connected wallet within seconds of transaction confirmation.",
    },
    {
      question: "Is the smart contract audited?",
      answer:
        "Yes, our smart contracts have been thoroughly audited by reputable security firms to ensure the safety of your investments.",
    },
    {
      question: "Can I stake my tokens?",
      answer:
        "Yes! Staking will be available in Q2 2026, allowing you to earn passive rewards by locking your tokens.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about Solaris Token ICO
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-purple-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;