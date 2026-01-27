"use client";
import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built on Solana for ultra-fast transactions with minimal fees",
    },
    {
      icon: "🔒",
      title: "Secure & Audited",
      description: "Smart contracts audited by leading security firms",
    },
    {
      icon: "🌐",
      title: "Decentralized",
      description: "Fully decentralized governance through DAO",
    },
    {
      icon: "💎",
      title: "Staking Rewards",
      description: "Earn passive income by staking your tokens",
    },
    {
      icon: "🚀",
      title: "Scalable",
      description: "Built to scale with growing user demand",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description: "Decisions made by token holders through voting",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Key Features
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the next generation of decentralized finance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;