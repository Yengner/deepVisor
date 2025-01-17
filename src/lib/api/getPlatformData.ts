import { createSupabaseClient } from "../utils/supabase/clients/server";

interface AggregatedMetric {
    platform_integration_id: string;
    total_spend: number;
    total_leads: number;
    total_clicks: number;
    total_ctr: number;
    total_link_clicks: number;
    total_impressions: number;
    total_messages: number;
    total_conversions: number;
}

export async function getPlatformData(platform: string, userId: string) {
    const supabase = await createSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('platform_aggregated_metrics')
            .select(`
                platform_integration_id,
                total_spend,
                total_leads,
                total_messages,
                total_clicks,
                total_link_clicks,
                total_ctr,
                total_impressions,
                total_conversions,
                platform_integrations!inner (
                    user_id,
                    platform_name
                )
            `)
            .eq('platform_integrations.platform_name', platform)
            .eq('platform_integrations.user_id', userId);

        if (error) {
            console.error('Error fetching aggregated metrics:', error.message);
            return getDefaultAggregatedMetrics();

        }

        if (!data || data.length === 0) {
            console.warn('No aggregated metrics found');
            // Return default empty metrics if no data is found
            return getDefaultAggregatedMetrics();
        }

        // Normalize data and handle missing values
        const normalizedData: AggregatedMetric[] = data.map((item) => ({
            platform_integration_id: item.platform_integration_id || '',
            total_spend: item.total_spend || 0,
            total_leads: item.total_leads || 0,
            total_clicks: item.total_clicks || 0,
            total_ctr: item.total_ctr || 0,
            total_link_clicks: item.total_link_clicks || 0,
            total_impressions: item.total_impressions || 0,
            total_messages: item.total_messages || 0,
            total_conversions: item.total_conversions || 0,
        }));


        return normalizedData;
    } catch (error) {
        console.error('Error in getPlatformData function:', error);
        return getDefaultAggregatedMetrics();
    }
}

function getDefaultAggregatedMetrics(): AggregatedMetric[] {
    return [
        {
            platform_integration_id: '',
            total_spend: 0,
            total_leads: 0,
            total_clicks: 0,
            total_ctr: 0,
            total_link_clicks: 0,
            total_impressions: 0,
            total_messages: 0,
            total_conversions: 0,
        },
    ];
}