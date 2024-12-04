import React, { useState } from 'react';

const CampaignCreationWizard = ({ platform, adAccountId }: { platform: string; adAccountId: string }) => {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${platform}/campaigns/${adAccountId}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, objective, start_time: startTime, stop_time: stopTime }),
      });

      if (!response.ok) throw new Error('Failed to create campaign');
      alert('Campaign created successfully');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Create New Campaign</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mt-2 p-2 border rounded"
          />
        </label>
        <label>
          Objective:
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="block w-full mt-2 p-2 border rounded"
          />
        </label>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="block w-full mt-2 p-2 border rounded"
          />
        </label>
        <label>
          Stop Time:
          <input
            type="datetime-local"
            value={stopTime}
            onChange={(e) => setStopTime(e.target.value)}
            className="block w-full mt-2 p-2 border rounded"
          />
        </label>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? 'Creating...' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
};

export default CampaignCreationWizard;
