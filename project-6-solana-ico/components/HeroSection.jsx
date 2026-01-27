"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroSection = ({
  wallet,
  isAdmin,
  loading,
  icoData,
  amount,
  userTokenBalance,
  setAmount,
  createIcoAta,
  depositIco,
  buyTokens,
}) => {
  const [icoProgress, setIcoProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (icoData) {
      const total = 1000000; // Total tokens for sale
      const sold = parseInt(userTokenBalance) || 0;
      setIcoProgress((sold / total) * 100);
    }
  }, [icoData, userTokenBalance]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endDate = new Date("2026-03-31").getTime();
      const distance = endDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-16">

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400">
              Solaris Token ICO
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the future of decentralized finance on Solana. Fast, secure, and revolutionary.
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-12">
            {["days", "hours", "mins", "secs"].map((unit) => (
              <div key={unit} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 min-w-[80px] border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400">
                  {timeLeft[unit]}
                </div>
                <div className="text-xs text-gray-400 uppercase">{unit}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ICO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30"
          >
            <h3 className="text-gray-400 text-sm mb-2">Token Price</h3>
            <p className="text-3xl font-bold text-white">0.001 SOL</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/30"
          >
            <h3 className="text-gray-400 text-sm mb-2">Your Balance</h3>
            <p className="text-3xl font-bold text-white">
              {(parseInt(userTokenBalance) / 1e9).toFixed(2)} SLR
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30"
          >
            <h3 className="text-gray-400 text-sm mb-2">ICO Progress</h3>
            <p className="text-3xl font-bold text-white">{icoProgress.toFixed(1)}%</p>
          </motion.div>
        </div>

        {/* Main Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700"
        >
          {!wallet.connected ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                Connect Your Wallet
              </h3>
              <p className="text-gray-400 mb-6">
                Connect your Solana wallet to participate in the ICO
              </p>
            </div>
          ) : isAdmin ? (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Admin Panel</h3>

              {!icoData ? (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ ICO not initialized. Please initialize first with the number of tokens.
                  </p>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                  <div className="text-green-400 text-sm mb-2">
                    ✓ ICO Already Initialized
                  </div>
                  <div className="text-gray-300 text-xs">
                    You can now deposit additional tokens or users can purchase tokens.
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    {!icoData ? "Initial Token Amount" : "Deposit Amount"}
                  </label>
                  <input
                    type="number"
                    placeholder={!icoData ? "Enter initial amount (e.g., 1000000)" : "Enter deposit amount"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    {!icoData
                      ? "This will initialize the ICO with specified tokens"
                      : "Additional tokens to deposit into the ICO"}
                  </p>
                </div>

                {!icoData ? (
                  <button
                    onClick={createIcoAta}
                    disabled={loading || !amount || parseInt(amount) <= 0}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    {loading ? "Processing..." : "Initialize ICO"}
                  </button>
                ) : (
                  <button
                    onClick={depositIco}
                    disabled={loading || !amount || parseInt(amount) <= 0}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    {loading ? "Processing..." : "Deposit Tokens"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Buy Tokens</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Amount of Tokens
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Cost: {(parseInt(amount || 0) * 0.001).toFixed(3)} SOL
                  </p>
                </div>

                <button
                  onClick={buyTokens}
                  disabled={loading || !amount || parseInt(amount) <= 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {loading ? "Processing..." : "Buy Tokens"}
                </button>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">You will receive:</span>
                    <span className="text-white font-semibold">
                      {amount || 0} SLR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Transaction fee:</span>
                    <span className="text-white font-semibold">~0.00001 SOL</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Progress Bar */}
        {icoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">ICO Progress</span>
                <span className="text-white font-semibold">{icoProgress.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${icoProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-500">0 SLR</span>
                <span className="text-gray-500">1,000,000 SLR</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;