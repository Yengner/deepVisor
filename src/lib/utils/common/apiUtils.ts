// Fetch data with Authorization header.

export const fetchWithValidation = async (
    url: string,
    accessToken: string,
    options: RequestInit = {}
): Promise<any> => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });

        if (!response.ok) {
            // Attempt to parse error details
            const errorDetails = await response.json().catch(() => ({}));
            throw new Error(
                errorDetails.error?.message ||
                `Request failed with status ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`FetchWithAuth Error: Failed to fetch from ${url}`, error);
        throw error;
    }
};


//Retry logic for fetching data.

export const fetchWithRetry = async (
    fetchFn: () => Promise<any>,
    retries: number = 3,
    delay: number = 1000
): Promise<any> => {
    let attempts = 0;

    while (attempts < retries) {
        try {
            return await fetchFn();
        } catch (error) {
            attempts++;
            if (attempts >= retries) {
                console.error('FetchWithRetry Error: Exceeded max retries', error);
                throw error;
            }
            console.warn(`FetchWithRetry: Attempt ${attempts} failed. Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};
