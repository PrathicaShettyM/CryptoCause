import React from "react";
import { motion } from "framer-motion";
import { 
  FaEthereum, 
  FaShieldAlt, 
  FaCertificate, 
  FaUsers, 
  FaRocket, 
  FaGlobe,
  FaChartLine,
  FaStar,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "./Features"; // ✅ Imported here

const GlowingCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ 
      y: -10, 
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const AnimatedButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 group relative overflow-hidden";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 shadow-md hover:shadow-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: 1, 
      y: 0,
      rotate: [0, 2, -2, 0]
    }}
    transition={{ 
      duration: 0.8, 
      delay,
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Icons */}
      <FloatingElement delay={1} className="absolute top-20 left-10 text-blue-400/30 text-3xl">
        <FaEthereum />
      </FloatingElement>
      <FloatingElement delay={1.5} className="absolute top-32 right-20 text-purple-400/30 text-2xl">
        <FaShieldAlt />
      </FloatingElement>
      <FloatingElement delay={2} className="absolute bottom-40 left-20 text-pink-400/30 text-2xl">
        <FaCertificate />
      </FloatingElement>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 pt-32 pb-20"
      >
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <FaStar className="text-yellow-500" />
              Next-Gen Philanthropic Platform
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 mb-8 leading-tight"
          >
            Blockchain-Powered
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Philanthropic Revolution
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            CryptoCause enables secure, trustless giving using smart contracts and cryptographic NFT-backed certificates. Experience transparent, decentralized social impact like never before.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <AnimatedButton variant="primary">
              <FaRocket />
              Explore Opportunities
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
            <AnimatedButton variant="secondary">
              <FaUsers />
              Start an Initiative
            </AnimatedButton>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
          >
            {[
              { icon: FaGlobe, number: "50K+", label: "Global Users" },
              { icon: FaChartLine, number: "$2.5M", label: "Funds Raised" },
              { icon: FaCertificate, number: "10K+", label: "NFT Certificates" },
              { icon: FaCheckCircle, number: "99.9%", label: "Transparency" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  <stat.icon />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ✅ Features Component Here */}
        <Features />

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center mt-24 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-gray-100"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of changemakers using blockchain technology to create transparent, verifiable social impact.
          </p>
          <AnimatedButton variant="primary" className="mx-auto">
            <FaRocket />
            Get Started Today
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </AnimatedButton>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}
