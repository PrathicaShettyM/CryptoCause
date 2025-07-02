import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaEthereum,
  FaHeart,
  FaCodeBranch
} from 'react-icons/fa';

const Link = ({ to, children, className }) => (
  <a
    href={to}
    className={`${className} text-gray-300 hover:text-white transition duration-300`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', href: '#', icon: FaTwitter, color: 'hover:text-blue-400' },
    { name: 'LinkedIn', href: '#', icon: FaLinkedin, color: 'hover:text-blue-600' },
    { name: 'GitHub', href: 'https://github.com/PrathicaShettyM/CryptoCause', icon: FaGithub, color: 'hover:text-gray-400' },
    { name: 'Discord', href: '#', icon: FaDiscord, color: 'hover:text-indigo-400' }
  ];

  const stack = {
    Frontend: [
      { name: 'React.js', href: 'https://react.dev/' },
      { name: 'Vite', href: 'https://vitejs.dev/' },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
      { name: 'Framer Motion', href: 'https://www.framer.com/motion/' }
    ],
    'Backend & Blockchain': [
      { name: 'Solidity', href: 'https://soliditylang.org/' },
      { name: 'Hardhat', href: 'https://hardhat.org/' },
      { name: 'MetaMask', href: 'https://metamask.io/' },
      { name: 'Ethers.js', href: 'https://docs.ethers.org/' }
    ],
    'Packages / SDKs / Tools': [
      { name: 'QRCode.js', href: 'https://github.com/soldair/node-qrcode' },
      { name: 'html2canvas', href: 'https://html2canvas.hertzen.com/' },
      { name: 'jsPDF', href: 'https://github.com/parallax/jsPDF' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo & About */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaEthereum className="text-white text-xl" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CryptoCause
                  </span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                  Empowering transparent philanthropy through blockchain. Verifiable NFT certificates. Transparent donations.
                </p>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.div
                        key={social.name}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link
                          to={social.href}
                          className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 hover:bg-white/20 ${social.color}`}
                        >
                          <IconComponent className="text-xl" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Tech Stack */}
            {Object.entries(stack).map(([category, tools], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FaCodeBranch className="text-white/80" /> {category}
                </h3>
                <ul className="space-y-3">
                  {tools.map((tech, i) => (
                    <motion.li
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Link to={tech.href} className="hover:underline hover:tracking-wide">
                        {tech.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="text-gray-300 text-sm">
                © 2025 CryptoCause. All rights reserved.
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <span>Built with</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <FaHeart className="text-red-400" />
                </motion.div>
                <span>for blockchain-powered philanthropy</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
