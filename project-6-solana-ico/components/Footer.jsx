"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", icon: "𝕏", url: "#" },
    { name: "Discord", icon: "💬", url: "#" },
    { name: "Telegram", icon: "📱", url: "#" },
    { name: "GitHub", icon: "💻", url: "#" },
  ];

  const quickLinks = [
    { name: "Documentation", url: "#" },
    { name: "Whitepaper", url: "#" },
    { name: "Audit Report", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Privacy Policy", url: "#" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <div className="flex items-center cursor-pointer mb-4">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={50}
                  height={30}
                />
                <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-emerald-500">
                  Solaris
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Building the future of decentralized finance on Solana. Fast, secure, and designed for everyone.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@solaris.io</li>
              <li>Support: support@solaris.io</li>
              <li>Business: partnerships@solaris.io</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Solaris Token. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Built on</span>
            <span className="bg-gradient-to-r from-purple-500 to-emerald-500 bg-clip-text text-transparent font-semibold">
              Solana
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;