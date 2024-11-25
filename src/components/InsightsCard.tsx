const InsightsCard = ({ insights }: { insights: any[] | null }) => {
    return (
      <div className="bg-white shadow rounded p-4">
        <h2 className="font-bold text-xl mb-4">Insights</h2>
        {insights?.length ? (
          <ul>
            {insights.map((data: any, index: number) => (
              <li key={index} className="border-b py-2">
                {data.date || data.week || data.month}: Spend: {data.spend}, Leads: {data.leads}
              </li>
            ))}
          </ul>
        ) : (
          <p>No insights available</p>
        )}
      </div>
    );
  };
  
  export default InsightsCard;
  