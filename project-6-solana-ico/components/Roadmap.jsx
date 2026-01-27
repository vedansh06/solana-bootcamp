"use client";
import React from "react";
import { motion } from "framer-motion";

const Roadmap = () => {
  const phases = [
    {
      quarter: "Q1 2026",
      title: "Launch Phase",
      items: [
        "Smart Contract Audit",
        "ICO Launch on Solana",
        "Community Building",
        "Initial Marketing Campaign",
      ],
      status: "active",
    },
    {
      quarter: "Q2 2026",
      title: "Development Phase",
      items: [
        "DEX Listing",
        "Mobile Wallet Integration",
        "Partnership Announcements",
        "Staking Platform Launch",
      ],
      status: "upcoming",
    },
    {
      quarter: "Q3 2026",
      title: "Expansion Phase",
      items: [
        "CEX Listings",
        "Cross-chain Bridge",
        "NFT Marketplace",
        "DAO Governance Launch",
      ],
      status: "upcoming",
    },
    {
      quarter: "Q4 2026",
      title: "Ecosystem Phase",
      items: [
        "DeFi Integration",
        "Major Exchange Listings",
        "Global Marketing Push",
        "Version 2.0 Release",
      ],
      status: "upcoming",
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Roadmap
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our journey to revolutionize decentralized finance
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-30" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div
                    className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-8 border ${phase.status === "active"
                      ? "border-purple-500 shadow-lg shadow-purple-500/20"
                      : "border-gray-700"
                      } hover:border-purple-500/50 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-purple-400 font-bold text-lg">
                        {phase.quarter}
                      </span>
                      {phase.status === "active" && (
                        <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold">
                          IN PROGRESS
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {phase.title}
                    </h3>
                    <ul className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center text-gray-300"
                        >
                          <svg
                            className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 items-center justify-center">
                  <div
                    className={`w-8 h-8 rounded-full border-4 ${phase.status === "active"
                      ? "border-purple-500 bg-purple-500 animate-pulse"
                      : "border-gray-600 bg-gray-800"
                      }`}
                  />
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;