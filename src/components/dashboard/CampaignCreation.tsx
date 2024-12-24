'use client'

import { useRouter } from 'next/navigation';

const CampaignCreation = () => {
  const router = useRouter();

  const handleCreateCampaign = () => {
    router.push('/campaigns/wizard'); // Adjust path to your wizard route
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Create a New Campaign</h2>
      <p className="text-sm text-gray-600">
        Start building your campaign step-by-step with our creation wizard.
      </p>
      <button
        onClick={handleCreateCampaign}
        className="w-full px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
      >
        Start Campaign Wizard
      </button>
    </div>
  );
};

export default CampaignCreation;
