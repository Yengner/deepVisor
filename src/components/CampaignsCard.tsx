const CampaignsCard = ({ campaigns }: { campaigns: any[] | null }) => {
    return (
      <div className="bg-white shadow rounded p-4 col-span-1 md:col-span-2">
        <h2 className="font-bold text-xl mb-4">Top Campaigns</h2>
        {campaigns?.length ? (
          <ul>
            {campaigns.map((campaign: any) => (
              <li key={campaign.id} className="border-b py-2">
                <strong>{campaign.name}</strong>: {campaign.leads} leads, {campaign.spend} spend
              </li>
            ))}
          </ul>
        ) : (
          <p>No top campaigns available</p>
        )}
      </div>
    );
  };
  
  export default CampaignsCard;
  