import { createSupabaseClient } from "@/lib/utils/supabase/clients/server";

export async function fetchRecommendations(userId: string) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('recommendations')
    .select('recommendations')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }

  return data.recommendations || [];
}