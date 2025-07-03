import { useLocation } from 'react-router-dom';
import { useStateContext } from '../context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonateButton from '../components/DonateButton';
import { useEffect, useState } from 'react';

const CampaignDetails = () => {
  const { state: campaignState } = useLocation();
  const { getCampaigns, contract } = useStateContext();
  const [campaign, setCampaign] = useState(campaignState);

  const fetchLatestCampaign = async () => {
    try {
      const allCampaigns = await getCampaigns();
      const latest = allCampaigns.find((c) => c.pId === campaignState.pId);
      if (latest) {
        setCampaign(latest);
      }
    } catch (error) {
      console.error("❌ Failed to fetch campaigns:", error);
    }
  };

  useEffect(() => {
    if (!contract) return;
    fetchLatestCampaign();
  }, [contract]);

  if (!campaign) return <div className="text-center mt-12">No campaign data found.</div>;

  return (
    <>
      <Navbar />
      <div className="px-8 py-12 bg-white min-h-screen">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-10 text-center mt-14">
          {campaign.title}
        </h1>

        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
          <img
            src={campaign.image}
            alt="campaign"
            className="w-full h-80 object-cover rounded-lg mb-8 shadow-md"
          />

          <p className="text-lg text-gray-800 mb-8 leading-relaxed">
            {campaign.description}
          </p>

          <div className="flex flex-col space-y-4 text-[17px] text-gray-900 font-medium">
            <p>
              <span className="text-blue-700 font-semibold">🎯 Target:</span>{' '}
              {(Number(campaign.target) / 1e18).toFixed(4)} ETH
            </p>
            <p>
              <span className="text-blue-700 font-semibold">💰 Raised:</span>{' '}
              {campaign.amountCollected} ETH
            </p>
            <p>
              <span className="text-blue-700 font-semibold">⏳ Deadline:</span>{' '}
              {new Date(campaign.deadline * 1000).toLocaleDateString()}
            </p>
            <p>
              <span className="text-blue-700 font-semibold">👤 Owner:</span>{' '}
              {campaign.owner}
            </p>

            <DonateButton
              pId={campaign.pId}
              campaign={campaign}
              target={campaign.target}
              amountCollected={campaign.amountCollected}
              onSuccess={fetchLatestCampaign}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignDetails;
