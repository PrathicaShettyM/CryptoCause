import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaDiscord,
  FaEthereum,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaShieldAlt
} from 'react-icons/fa';

const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const Footer = () => {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Home", href: "/", icon: FaHome },
        { name: "About Us", href: "/about", icon: FaInfoCircle },
        { name: "Contact", href: "/contact", icon: FaEnvelope },
        { name: "Privacy Policy", href: "/privacy", icon: FaShieldAlt }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community" },
        { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Developers",
      links: [
        { name: "API Reference", href: "/api" },
        { name: "Smart Contracts", href: "/contracts" },
        { name: "SDK", href: "/sdk" },
        { name: "GitHub", href: "/github" }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: "Twitter", 
      href: "#", 
      icon: FaTwitter,
      color: "hover:text-blue-400"
    },
    { 
      name: "LinkedIn", 
      href: "#", 
      icon: FaLinkedin,
      color: "hover:text-blue-600"
    },
    { 
      name: "GitHub", 
      href: "https://github.com/PrathicaShettyM/CryptoCause", 
      icon: FaGithub,
      color: "hover:text-gray-400"
    },
    { 
      name: "Discord", 
      href: "#", 
      icon: FaDiscord,
      color: "hover:text-indigo-400"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
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
                  Empowering transparent philanthropy through blockchain technology. 
                  Create verifiable impact with smart contracts and NFT certificates.
                </p>

                {/* Social Links */}
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
                          className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-white/20 ${social.color}`}
                        >
                          <IconComponent className="text-xl" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                      >
                        <Link
                          to={link.href}
                          className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                        >
                          {IconComponent && (
                            <IconComponent className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                          )}
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.name}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <span>© 2025 CryptoCause. All rights reserved.</span>
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