import { createSupabaseClient } from "../utils/supabase/clients/server";

export async function storeAggregatedMetrics(userId: string, metrics: { platform: string; spend: number; leads: number }[]) {
    const supabase = await createSupabaseClient();

    const upsertData = metrics.map((metric) => ({
        user_id: userId,
        platform: metric.platform,
        spend: metric.spend,
        leads: metric.leads,
        updated_at: new Date(),
    }));

    const { error } = await supabase.from('aggregated_metrics').upsert(upsertData, {
        onConflict: 'user_id',
    });

    if (error) {
        console.error('Error storing aggregated metrics:', error.message);
        throw new Error('Failed to store aggregated metrics');
    }
}