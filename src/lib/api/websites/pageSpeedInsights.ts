const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function fetchPageSpeedData(url: string, strategy: 'mobile' | 'desktop') {
  const apiKey = process.env.PAGE_SPEED_INSIGHTS_API_KEY;

  if (!apiKey) {
    throw new Error('PageSpeed Insights API Key is missing');
  }

  const apiUrl = `${PAGESPEED_API_URL}?url=${encodeURIComponent(
    url
  )}&key=${apiKey}&strategy=${strategy}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch PageSpeed data: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    performanceScore: data.lighthouseResult.categories.performance?.score * 100 || null,
    seoScore: data.lighthouseResult.categories.seo?.score * 100 || null,
    accessibilityScore:
      data.lighthouseResult.categories.accessibility?.score * 100 || null,
    finalScreenshot: data.lighthouseResult.audits['final-screenshot']?.details?.data || null,
    audits: data.lighthouseResult.audits,
  };
}
