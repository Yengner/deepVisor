// import { fetchWithValidation } from "@/lib/utils/common/apiUtils";

// export const fetchAgeGenderCountryMetrics = async (
//   adAccountId: string,
//   accessToken: string
// ): Promise<{
//   ageGenderData: { age: string; gender: string; impressions: number }[];
//   countryData: { date_start: string; date_stop: string; spend: string; country: string; impressions: number }[];
// }> => {

//   const API_BASE_URL = process.env.FACEBOOK_GRAPH_API_BASE_URL;

//   if (!API_BASE_URL) {
//     throw new Error("FACEBOOK_GRAPH_API_BASE_URL is not set in the environment variables");
//   }

//   const urls = {
//     ageGender: `${API_BASE_URL}/${adAccountId}/insights?breakdowns=age,gender&date_preset=maximum`,
//     country: `${API_BASE_URL}/${adAccountId}/insights?breakdowns=country&date_preset=maximum`,
//   };

//   // Fetch both metrics in parallel
//   const [ageGenderDatas, countryDatas] = await Promise.all([
//     fetchWithValidation(urls.ageGender, accessToken),
//     fetchWithValidation(urls.country, accessToken),
//   ]);

//   // Validate API data structure
//   if (!ageGenderDatas.data || !Array.isArray(ageGenderDatas.data)) {
//     throw new Error("Invalid age and gender data format");
//   }
//   if (!countryDatas.data || !Array.isArray(countryDatas.data)) {
//     throw new Error("Invalid country data format");
//   }

//   // Transform age and gender data
//   const ageGenderData = ageGenderDatas.data.map((entry: any) => ({
//     age: entry.age || "unknown",
//     gender: entry.gender || "unknown",
//     impressions: parseInt(entry.impressions || "0", 10),
//   }));

//   // Transform country data
//   const countryData = countryDatas.data.map((entry: any) => ({
//     date_start: entry.date_start,
//     date_stop: entry.date_stop,
//     spend: entry.spend || "0",
//     country: entry.country || "unknown",
//     impressions: parseInt(entry.impressions || "0", 10), // Adjust field as needed (impressions/reach)
//   }));

//   return { ageGenderData, countryData };
// };
