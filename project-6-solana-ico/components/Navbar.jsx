"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Home", path: "#home", isScrollSpy: true },
    { title: "Ico Chart", path: "#chart", isScrollSpy: true },
    { title: "Roadmap", path: "#roadmap", isScrollSpy: true },
    { title: "Features", path: "#features", isScrollSpy: true },
    { title: "About", path: "#about", isScrollSpy: true },
  ];

  const handleScrollSpy = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-area fixed top-0 left-0 right-0 z-50">
      <div
        className={`xb-header ${isSticky ? "sticky" : ""} bg-gray-900 border-b border-gray-800`}
        style={{
          backdropFilter: isSticky ? "blur(10px)" : "none",
          backgroundColor: isSticky
            ? "rgba(17,24,39,0.85)"
            : "rgb(17,24,39)",
        }}
      >
        <div className="container mx-auto">
          <div className="header__wrap flex items-center justify-between py-4 px-4">

            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={70}
                  height={40}
                  priority
                />
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-emerald-500">
                  Solaris
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                {menuItems.map((item, index) => (
                  <li key={index} className="relative group">
                    {item.isScrollSpy ? (
                      <a
                        href={item.path}
                        onClick={(e) => handleScrollSpy(e, item.path)}
                        className="text-gray-300 hover:text-white transition-colors duration-300 py-2 px-1 font-medium"
                      >
                        <span>{item.title}</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    ) : (
                      <Link href={item.path} className="text-gray-300 py-2 px-1">
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Wallet Button */}
            {mounted && (
              <div className="hidden lg:block">
                <WalletMultiButtonDynamic />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-800 py-4">
              <nav className="flex flex-col space-y-2 px-4">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    onClick={(e) => handleScrollSpy(e, item.path)}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 py-3 px-4 rounded-lg font-medium"
                  >
                    {item.title}
                  </a>
                ))}
                {mounted && (
                  <div className="pt-4">
                    <WalletMultiButtonDynamic />
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;