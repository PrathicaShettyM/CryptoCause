import React, { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaGift, 
  FaGlobe, 
  FaKey,
  FaPlay,
  FaPause,
  FaCheckCircle,
  FaCoins,
  FaUsers,
  FaChartLine,
  FaLock,
  FaEthereum
} from 'react-icons/fa';

const CryptoCauseFeatures = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const cards = [
    {
      title: "Blockchain & Cryptography: The Foundational Synergy",
      icon: FaShieldAlt,
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      content: {
        subtitle: "Establishing trust through decentralized and secure systems",
        description: "Blockchain technology is intrinsically linked to cryptography, which forms the backbone of data integrity and trust in decentralized networks.",
        features: [
          {
            icon: FaLock,
            title: "Cryptographic Security",
            desc: "Each donation is encapsulated within cryptographically hashed blocks, ensuring immutability and resistance to tampering"
          },
          {
            icon: FaShieldAlt,
            title: "Trusted Architecture",
            desc: "Guarantees secure records, authenticated donor and recipient identities, and full traceability of transactions"
          },
          {
            icon: FaKey,
            title: "Advanced Techniques",
            desc: "SHA-256 hashing and ECDSA signatures ensure all operations are verifiable and tamper-evident"
          }
        ]
      }
    },
    {
      title: "Limitations of Conventional Donation Platforms",
      icon: FaExclamationTriangle,
      gradient: "from-red-500 to-pink-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      content: {
        subtitle: "Bridging the transparency and accountability gap",
        sections: [
          {
            title: "Transparency Issues",
            icon: FaExclamationTriangle,
            points: [
              "Absence of transparency in fund utilization and allocation post-donation",
              "Donors lack access to real-time updates or audit trails for their contributions",
              "No visibility into how funds are actually being used"
            ]
          },
          {
            title: "Efficiency Problems",
            icon: FaUsers,
            points: [
              "Multiple intermediaries reduce efficiency and delay fund disbursement",
              "High transaction fees eat into donation amounts",
              "Complex bureaucratic processes slow down aid delivery"
            ]
          },
          {
            title: "Trust Concerns",
            icon: FaCheckCircle,
            points: [
              "Prevalence of fraudulent or unverified campaigns undermines donor confidence",
              "Lack of proper verification systems for recipients",
              "No guarantee that funds reach intended beneficiaries"
            ]
          }
        ]
      }
    },
    {
      title: "Innovative Features: Verified Campaigns & Incentivized Donations",
      icon: FaGift,
      gradient: "from-green-500 to-emerald-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      content: {
        subtitle: "Enhancing trust and engagement in philanthropic ecosystems",
        steps: [
          {
            step: "01",
            title: "Campaign Creation",
            icon: FaUsers,
            desc: "Individuals and organizations launch donation campaigns with cryptographically verifiable metadata and deadlines"
          },
          {
            step: "02", 
            title: "Secure Donations",
            icon: FaCoins,
            desc: "Contributors discover campaigns, make secure donations, and monitor progress through on-chain metrics"
          },
          {
            step: "03",
            title: "Verification & Certificates",
            icon: FaCheckCircle,
            desc: "Digital signatures validate authenticity while donors receive blockchain-verifiable NFT certificates"
          }
        ]
      }
    },
    {
      title: "Societal Impact & Real-World Relevance",
      icon: FaGlobe,
      gradient: "from-purple-500 to-indigo-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      content: {
        subtitle: "Creating a reliable and scalable philanthropic infrastructure",
        toolInfo: {
          title: "Powered by Blockchain Technology",
          desc: "Leveraging distributed ledger technology for transparent, auditable, and efficient donation management"
        },
        features: [
          { 
            name: "Global NGO Access", 
            desc: "Grassroots NGOs can reach international donors with full visibility into fund utilization. This democratizes fundraising by removing geographical barriers and enabling direct connection between donors and causes worldwide. Small organizations gain the same transparency tools as large institutions, leveling the playing field for charitable work.", 
            icon: "🌍" 
          },
          { 
            name: "Emergency Response", 
            desc: "Emergency-driven campaigns benefit from immediate verification and donation receipts. In crisis situations, rapid fund deployment is crucial. Our platform enables instant campaign setup with cryptographic verification, allowing donors to contribute immediately while maintaining full transparency about fund usage and impact metrics.", 
            icon: "⚡" 
          },
          { 
            name: "Audit Capabilities", 
            desc: "Government entities and academic institutions can conduct audits without compromising donor privacy. The blockchain provides immutable transaction records while maintaining anonymity through cryptographic techniques. This enables regulatory compliance and academic research while protecting individual donor information.", 
            icon: "📊" 
          },
          { 
            name: "Live Dashboards", 
            desc: "Donors are empowered with real-time dashboards showcasing fund disbursement, usage analytics, and impact metrics. Interactive visualizations display how donations are allocated, spent, and what outcomes they achieve. This continuous feedback loop builds trust and encourages sustained philanthropic engagement.", 
            icon: "📈" 
          },
          { 
            name: "Gamification Elements", 
            desc: "NFT-style certificates tied to wallet addresses can be verified on-chain and utilized for tax deductions or credibility on social platforms. This gamification approach motivates consistent participation while providing tangible benefits to donors, creating a sustainable ecosystem for charitable giving.", 
            icon: "🎮" 
          },
          { 
            name: "Pilot Programs", 
            desc: "Currently being tested in campus-led donation drives and NGO collaboration initiatives to validate scalability and usability in real-world scenarios. These pilot programs provide valuable feedback for platform optimization and demonstrate practical applications across different organizational contexts and user demographics.", 
            icon: "🚀" 
          }
        ]
      }
    },
    {
      title: "Applied Cryptography: The Core Technical Enablers",
      icon: FaKey,
      gradient: "from-slate-600 to-gray-700",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      content: {
        subtitle: "Ensuring confidentiality, authenticity, and verifiability",
        description: "Our cryptographic foundation leverages industry-standard algorithms and protocols to create an unbreachable security framework.",
        features: [
          {
            icon: FaLock,
            title: "SHA-256 Hashing",
            desc: "Ensures data immutability by converting transactions into fixed-length, irreversible digital fingerprints"
          },
          {
            icon: FaKey,
            title: "ECDSA Signatures",
            desc: "Enables campaign authentication and non-repudiation of donation receipts through elliptic curve cryptography"
          },
          {
            icon: FaShieldAlt,
            title: "Smart Contracts",
            desc: "Automate campaign validation, donation thresholds, and certificate issuance with predefined logic"
          }
        ]
      }
    }
  ];

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
      }, 16000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, cards.length]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const currentData = cards[currentCard];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4  bg-opacity-10 rounded-full backdrop-blur-sm">
              <FaEthereum className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            CryptoCause Platform
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing philanthropy through blockchain technology, cryptographic security, and transparent donation management
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-3">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCard 
                    ? `bg-gradient-to-r ${currentData.gradient}` 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${currentData.gradient} p-8 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 ${currentData.iconBg} rounded-2xl`}>
                    <currentData.icon className={`w-8 h-8 ${currentData.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-90 mb-1">
                      Feature {currentCard + 1} of {cards.length}
                    </div>
                    <h2 className="text-3xl font-bold">{currentData.title}</h2>
                  </div>
                </div>
                <button
                  onClick={toggleAutoPlay}
                  className="p-3  bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
                >
                  {isAutoPlay ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-8">
              {currentCard === 0 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentData.content.subtitle}</h3>
                    <p className="text-gray-600 max-w-3xl mx-auto">{currentData.content.description}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {currentData.content.features.map((feature, idx) => (
                      <div key={idx} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                        <div className="flex justify-center mb-4">
                          <div className="p-4 bg-blue-100 rounded-2xl">
                            <feature.icon className="w-8 h-8 text-blue-600" />
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentCard === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentData.content.subtitle}</h3>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                      CryptoCause addresses critical issues in traditional donation platforms through blockchain innovation.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {currentData.content.sections.map((section, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                          <section.icon className="w-6 h-6 text-gray-700 mr-3" />
                          <h4 className="font-bold text-gray-800">{section.title}</h4>
                        </div>
                        <ul className="space-y-2">
                          {section.points.map((point, pidx) => (
                            <li key={pidx} className="text-gray-600 text-sm flex items-start">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentCard === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentData.content.subtitle}</h3>
                  </div>
                  <div className="space-y-6">
                    {currentData.content.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold">{step.step}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <step.icon className="w-5 h-5 text-gray-700 mr-2" />
                            <h4 className="font-bold text-gray-800">{step.title}</h4>
                          </div>
                          <p className="text-gray-600">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentCard === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentData.content.subtitle}</h3>
                    <div className="bg-purple-50 rounded-2xl p-6 max-w-2xl mx-auto">
                      <h4 className="font-bold text-purple-800 mb-2">{currentData.content.toolInfo.title}</h4>
                      <p className="text-purple-700 text-sm">{currentData.content.toolInfo.desc}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentData.content.features.map((feature, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="p-3 bg-purple-100 rounded-xl">
                              <span className="text-2xl">{feature.icon}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-3 text-lg">{feature.name}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentCard === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentData.content.subtitle}</h3>
                    <p className="text-gray-600 max-w-3xl mx-auto">{currentData.content.description}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {currentData.content.features.map((feature, idx) => (
                      <div key={idx} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                        <div className="flex justify-center mb-4">
                          <div className="p-4 bg-gray-100 rounded-2xl">
                            <feature.icon className="w-8 h-8 text-gray-600" />
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="border-t border-gray-100 px-8 py-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {currentCard + 1} of {cards.length} features
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={prevCard}
                    disabled={currentCard === 0}
                    className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextCard}
                    disabled={currentCard === cards.length - 1}
                    className={`px-6 py-3 bg-gradient-to-r ${currentData.gradient} text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center mt-12">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex space-x-2">
              {cards.map((card, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    index === currentCard
                      ? `bg-gradient-to-r ${currentData.gradient} text-white shadow-lg`
                      : 'text-gray-600 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCauseFeatures;