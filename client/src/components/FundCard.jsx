import { useNavigate } from 'react-router-dom';

const FundCard = ({ campaign, index }) => {
  const navigate = useNavigate();

  const handleViewCampaign = () => {
    navigate(`/campaign/${index}`, { state: campaign });
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col">
      <img
        src={campaign.image}
        alt="campaign"
        className="w-full h-64 object-cover"
      />

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">{campaign.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{campaign.description}</p>

        <div className="mt-auto space-y-1 text-sm text-gray-800">
          <p><strong>🎯 Target:</strong> {campaign.target} ETH</p>
          <p><strong>⏳ Deadline:</strong> {new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
        </div>

        <button
          onClick={handleViewCampaign}
          className="mt-5 w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
        >
          View Campaign
        </button>
      </div>
    </div>
  );
};

export default FundCard;
