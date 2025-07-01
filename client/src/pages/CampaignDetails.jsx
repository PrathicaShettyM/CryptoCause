import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const CampaignDetails = () => {
  const { state: campaign } = useLocation();

  if (!campaign) return <div className="text-center mt-12">No campaign data found.</div>;

  return (
    <>
      <Navbar />
      <div className="px-8 py-12 bg-white min-h-screen">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 mb-8 text-center">
          {campaign.title}
        </h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border">
          <img src={campaign.image} alt="campaign" className="w-full h-64 object-cover rounded-lg mb-6" />
          <p className="text-lg text-gray-800 mb-4">{campaign.description}</p>
          <div className="space-y-2">
            <p><strong className="text-blue-700">Target:</strong> {campaign.target} ETH</p>
            <p><strong className="text-blue-700">Deadline:</strong> {new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
            <p><strong className="text-blue-700">Owner:</strong> {campaign.owner}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignDetails;
