import { useNavigate } from 'react-router-dom';

const FundCard = ({ campaign, index }) => {
  const navigate = useNavigate();

  const handleViewCampaign = () => {
    navigate(`/campaign/${index}`, { state: campaign });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition duration-300">
      <img src={campaign.image} alt="campaign" className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800 truncate">{campaign.title}</h3>
      <p className="text-gray-600 text-sm mb-2 truncate">{campaign.description}</p>
      <p className="text-sm text-gray-800"><strong>Target:</strong> {campaign.target} ETH</p>
      <p className="text-sm text-gray-800"><strong>Deadline:</strong> {new Date(campaign.deadline * 1000).toLocaleDateString()}</p>

      <button
        onClick={handleViewCampaign}
        className="mt-4 w-full py-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium rounded-lg hover:opacity-90"
      >
        View Campaign
      </button>
    </div>
  );
};

export default FundCard;
