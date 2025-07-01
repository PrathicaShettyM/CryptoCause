import React from 'react';
import FundCard from '../components/FundCard';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => (
  <div className="px-8 py-12 bg-white min-h-screen">
    <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 mb-12 mt-16 leading-snug pb-2">
      {title}
    </h2>

    {isLoading ? (
      <p className="text-center">Loading campaigns...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((campaign, index) => (
          <FundCard key={index} campaign={campaign} index={index} />
        ))}
      </div>
    )}
  </div>
);

export default DisplayCampaigns;
