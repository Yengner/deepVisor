import { createSupabaseClient } from "../utils/supabase/clients/server";

interface AggregatedMetric {
  id: string;
  user_id: string;
  platform: string;
  spend: number;
  leads: number;
  ctr: number;
  link_clicks: number;
  impressions: number;
  messages: number;
  previous_performance_score: number; // Add previous performance score to the interface
}

export async function getTopPlatforms(userId: string) {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('aggregated_metrics')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching aggregated metrics:', error.message);
    throw new Error('Failed to fetch aggregated metrics');
  }

  if (!data || data.length === 0) {
    throw new Error('No aggregated metrics found');
  }

  const topPlatform = {
    leads: getBestPlatform(data, 'leads'),
    ctr: getBestPlatform(data, 'ctr'),
    link_clicks: getBestPlatform(data, 'link_clicks'),
    impressions: getBestPlatform(data, 'impressions'),
    messages: getBestPlatform(data, 'messages'),
  };

  // Normalize and calculate performance scores
  const platformsWithScores = data.map((platform) => {
    const currentScore = calculatePerformanceScore(platform, data);
    const previousScore = platform.previous_performance_score;

    return {
      ...platform,
      performanceScore: currentScore,
      percentageChange:
        previousScore && previousScore !== 0
          ? ((currentScore - previousScore) / previousScore) * 100
          : null, // Return null if previous score is invalid or 0
    };
  });

  // Sort by performance score and get the top 5 platforms
  const topPlatforms = platformsWithScores.sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);
  return { metrics: data, topPlatform, topPlatforms };
}

// Check for best platform based on each metric in the supabse table
function getBestPlatform(data: AggregatedMetric[], metric: keyof AggregatedMetric) {
  return data.reduce((best, current) => {
    if (current[metric] > (best[metric] ?? -Infinity)) {
      return current;
    }
    return best;
  }, {} as AggregatedMetric);
}

function calculatePerformanceScore(platform: AggregatedMetric, data: AggregatedMetric[]): number {
  const weights = {
    spend: 0.3,        // Weight for spend
    leads: 0.5,        // Weight for leads
    messages: 0.5,     // Weight for messages
    link_clicks: 0.4,  // Weight for link clicks
    ctr: 0.2,          // Weight for click-through rate
    impressions: 0.1,  // Weight for impressions
  };

  // Get maximum values for each metric to normalize scores
  const maxValues = {
    spend: Math.max(...data.map((p) => p.spend)),
    leads: Math.max(...data.map((p) => p.leads)),
    messages: Math.max(...data.map((p) => p.messages)),
    link_clicks: Math.max(...data.map((p) => p.link_clicks)),
    ctr: Math.max(...data.map((p) => p.ctr)),
    impressions: Math.max(...data.map((p) => p.impressions)),
  };

  // Calculate normalized score for each metric
  const normalizedScore = (metric: keyof typeof weights) =>
    maxValues[metric] > 0 ? (platform[metric] / maxValues[metric]) * 100 : 0;

  // Aggregate normalized scores using weights
  return (
    normalizedScore('spend') * weights.spend +
    normalizedScore('leads') * weights.leads +
    normalizedScore('messages') * weights.messages +
    normalizedScore('link_clicks') * weights.link_clicks +
    normalizedScore('ctr') * weights.ctr +
    normalizedScore('impressions') * weights.impressions
  ) / Object.values(weights).reduce((sum, weight) => sum + weight, 0); // Normalize total score to 0–100
}