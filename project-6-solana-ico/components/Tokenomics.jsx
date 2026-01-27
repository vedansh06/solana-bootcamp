"use client";
import React from "react";
import { motion } from "framer-motion";

const Tokenomics = () => {
  const distribution = [
    { label: "Public Sale", percentage: 40, color: "from-purple-500 to-pink-500", startColor: "#a855f7", endColor: "#ec4899" },
    { label: "Team & Advisors", percentage: 20, color: "from-blue-500 to-cyan-500", startColor: "#3b82f6", endColor: "#06b6d4" },
    { label: "Development", percentage: 20, color: "from-emerald-500 to-teal-500", startColor: "#10b981", endColor: "#14b8a6" },
    { label: "Marketing", percentage: 10, color: "from-orange-500 to-yellow-500", startColor: "#f97316", endColor: "#eab308" },
    { label: "Reserve", percentage: 10, color: "from-red-500 to-pink-500", startColor: "#ef4444", endColor: "#ec4899" },
  ];

  return (
    <section id="chart" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Tokenomics
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fair and transparent token distribution designed for long-term success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Pie Chart Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {distribution.reduce((acc, item, index) => {
                  const previousSum = distribution
                    .slice(0, index)
                    .reduce((sum, d) => sum + d.percentage, 0);
                  const circumference = 2 * Math.PI * 80;
                  const offset = (previousSum / 100) * circumference;
                  const dashArray = `${(item.percentage / 100) * circumference} ${circumference}`;

                  return [
                    ...acc,
                    <circle
                      key={index}
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke={`url(#gradient-${index})`}
                      strokeWidth="40"
                      strokeDasharray={dashArray}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                    />,
                  ];
                }, [])}
                {distribution.map((item, index) => (
                  <defs key={`gradient-${index}`}>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={item.startColor} />
                      <stop offset="100%" stopColor={item.endColor} />
                    </linearGradient>
                  </defs>
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">1B</div>
                  <div className="text-sm text-gray-400">Total Supply</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Distribution List */}
          <div className="space-y-4">
            {distribution.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{item.label}</h3>
                  <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${item.color} h-full rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Token Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: "Total Supply", value: "1,000,000,000" },
            { label: "ICO Price", value: "0.001 SOL" },
            { label: "Soft Cap", value: "100,000 SOL" },
            { label: "Hard Cap", value: "400,000 SOL" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center"
            >
              <div className="text-gray-400 text-sm mb-2">{item.label}</div>
              <div className="text-white font-bold text-xl">{item.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;