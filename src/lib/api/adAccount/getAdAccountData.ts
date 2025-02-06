import { createSupabaseClient } from "@/lib/utils/supabase/clients/server";

export async function getAdAccountData(platform: string, adAccountId: string, userId: string) {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
        .from('ad_accounts')
        .select('ad_account_id, name, account_status, time_increment_metrics, aggregated_metrics, industry_id(name), time_increment_metrics')
        .eq('platform_name', platform)
        .eq('ad_account_id', adAccountId)
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching platform data:', error);
        return null;
    }

    const industry = data[0].industry_id as { name?: string };
    return {
        ad_account_id: data[0].ad_account_id,
        name: data[0].name,
        account_status: data[0].account_status,
        time_increment_metrics: data[0].time_increment_metrics || {},
        aggregated_metrics: data[0].aggregated_metrics || {},
        industry: industry.name || null,
    }

}