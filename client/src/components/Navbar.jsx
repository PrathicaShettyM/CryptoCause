import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaPlus, 
  FaWallet, 
  FaUser, 
  FaBars,
  FaTimes,
  FaEthereum
} from 'react-icons/fa';
import { GrView } from "react-icons/gr";
import { FaFileCircleCheck } from "react-icons/fa6";

import { useStateContext } from '../context';

const Link = ({ to, children, className, onClick }) => (
  <a href={to} className={`${className} cursor-pointer`} onClick={onClick}>
    {children}
  </a>
);

const navigate = (path) => console.log('Navigate to:', path);

const CustomButton = ({ btnType, title, styles, handleClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type={btnType}
    className={`rounded-full font-semibold transition-all duration-300 cursor-pointer ${styles}`}
    onClick={handleClick}
  >
    {title}
  </motion.button>
);

const Navbar = () => {
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { connect, address } = useStateContext();

  const navlinks = [
    { name: 'dashboard', icon: FaHome, link: '/' },
    { name: 'create campaign', icon: FaPlus, link: '/create-campaign' },
    { name: 'view campaigns', icon: GrView, link: '/view-campaigns' },
    { name: 'verify NFTs', icon: FaFileCircleCheck, link: '/verify-nfts' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-gray-200/50'
          : 'bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-100/50'
      } px-4 sm:px-6 py-4`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <FaEthereum className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
            CryptoCause
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 flex-shrink-0 ml-6 lg:ml-12">
          {navlinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <motion.div key={link.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={link.link}
                  onClick={() => setIsActive(link.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 relative overflow-hidden group whitespace-nowrap cursor-pointer ${
                    isActive === link.name
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="text-sm flex-shrink-0" />
                  <span className="capitalize">{link.name}</span>
                  {isActive === link.name && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <CustomButton
            btnType="button"
            title={address ? 'Wallet Connected' : 'Connect Wallet'}
            styles={`${
                address
                    ? 'bg-gray-200 text-gray-700 text-sm px-4 py-2 cursor-default'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl text-sm px-4 py-2 cursor-pointer'
                  }`}
  handleClick={!address ? connect : () => {}}
/>


          <Link to="/profile" className="group">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 shadow-md group-hover:shadow-lg cursor-pointer">
              <FaUser className="text-gray-600 group-hover:text-blue-600 transition-colors text-sm" />
            </div>
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
          <Link to="/profile" className="group">
            <div className="w-9 h-9 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 cursor-pointer">
              <FaUser className="text-gray-600 group-hover:text-blue-600 transition-colors text-xs" />
            </div>
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setToggleDrawer(!toggleDrawer)}
            className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white shadow-lg"
          >
            <AnimatePresence mode="wait">
              {toggleDrawer ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="text-xs" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="text-xs" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* No mobile drawer updates here for now; desktop is fixed as requested */}
    </motion.nav>
  );
};

export default Navbar;
