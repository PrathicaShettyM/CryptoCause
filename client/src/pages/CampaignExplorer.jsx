// src/pages/CampaignExplorer.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFundingContract } from '../utils/getContract';
import campaignImage from '../assets/campaign.jpg'; // Adjust path as needed


const CampaignExplorer = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const contract = await getFundingContract();
        const result = await contract.getCampaigns();
        setCampaigns(result);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Campaigns</h2>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <Link to={`/campaign/${index}`} key={index} className="bg-white shadow-md p-4 rounded hover:shadow-xl transition">
              <img src={campaignImage} alt={campaign.title} className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{campaign.description.slice(0, 80)}...</p>
              <p className="text-gray-800 text-sm"><strong>Target:</strong> {Number(campaign.target) / 1e18} ETH</p>
              <p className="text-gray-800 text-sm"><strong>Raised:</strong> {Number(campaign.amountCollected) / 1e18} ETH</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignExplorer;
