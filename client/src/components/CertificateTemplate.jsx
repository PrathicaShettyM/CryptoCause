const CertificateTemplate = ({ donor, campaignTitle, amount, txHash }) => {
  return (
    <div className="w-[700px] h-[500px] p-10 bg-white border-4 border-blue-500 rounded-xl shadow-2xl text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Donation Certificate</h1>
      <p className="text-lg text-gray-700 mt-4">
        This certifies that <strong>{donor}</strong> has generously donated
      </p>
      <p className="text-2xl font-bold text-purple-600 my-3">{amount} ETH</p>
      <p className="text-lg text-gray-700">
        to the campaign <strong>"{campaignTitle}"</strong>.
      </p>
      <p className="mt-6 text-sm text-gray-500">
        TX Hash: {txHash}
      </p>
      <p className="mt-2 text-sm text-gray-400">Issued by CryptoCause</p>
    </div>
  );
};

export default CertificateTemplate;
