const MOZ_API_URL = 'https://lsapi.seomoz.com/v2/url_metrics';

export async function fetchMozMetrics(domain: string) {
    const apiToken = process.env.MOZ_API_TOKEN;

    if (!apiToken) {
        throw new Error('Moz API token is missing');
    }

    const headers = {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
        targets: [domain], // List of domains or URLs
        metrics: [
            'domain_authority',
            'page_authority',
            'linking_root_domains',
            'external_links',
            'moz_rank',
        ],
    });

    const response = await fetch(MOZ_API_URL, {
        method: 'POST',
        headers,
        body,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch Moz metrics: ${response.statusText}`);
    }

    return response.json();
}
